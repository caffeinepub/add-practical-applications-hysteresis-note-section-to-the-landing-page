import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Contact = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
    submitter : ?Principal;
  };

  let submissions = List.empty<Contact>();
  let rateLimitState = Map.empty<Principal, Int>();
  let rateLimitInterval = 360_000_000_000; // 6 minutes in nanoseconds

  public query ({ caller }) func getAllContacts() : async [Contact] {
    submissions.toArray();
  };

  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    if (name.size() > 100) { Runtime.trap("Name too long. Max 100 characters.") };
    if (email.size() > 100) { Runtime.trap("Email too long. Max 100 characters.") };
    if (message.size() > 2000) { Runtime.trap("Message too long. Max 2000 characters.") };

    let now = Time.now();

    let isAnonymous = switch (caller.toText()) {
      case ("2vxsx-fae") { true };
      case (_) { false };
    };

    if (not isAnonymous) {
      switch (rateLimitState.get(caller)) {
        case (null) {
          rateLimitState.add(caller, now);
        };
        case (?lastTime) {
          if (now - lastTime < rateLimitInterval) {
            Runtime.trap("Please wait before submitting another message.");
          };
          rateLimitState.add(caller, now);
        };
      };
    };

    let contact : Contact = {
      name;
      email;
      message;
      timestamp = now;
      submitter = if (isAnonymous) { null } else { ?caller };
    };

    submissions.add(contact);
  };
};
