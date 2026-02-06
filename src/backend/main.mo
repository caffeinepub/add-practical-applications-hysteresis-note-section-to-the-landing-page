import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Types and Storage
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Contact Submission Types and Storage
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
  let maxSubmissions = 1000; // Cap size instead of full clear

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Submission Functions
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    validateInputSizes(name, email, message);

    let now = Time.now();
    let isAnonymous = isAnonymousCaller(caller);

    if (not isAnonymous) {
      checkRateLimit(caller, now);
    };

    let contact : Contact = {
      name;
      email;
      message;
      timestamp = now;
      submitter = if (isAnonymous) { null } else { ?caller };
    };

    addContactWithLimit(contact);
  };

  public query ({ caller }) func getContacts(page : Nat, pageSize : Nat) : async [Contact] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contacts");
    };

    let start = page * pageSize;
    if (page >= submissions.size() or start >= submissions.size()) {
      return [];
    };

    let end = if (start + pageSize > submissions.size()) {
      submissions.size();
    } else {
      start + pageSize;
    };

    let array = submissions.toArray();
    sliceArray(array, start, end);
  };

  public query ({ caller }) func getContactCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can get contact count");
    };
    submissions.size();
  };

  // Helper Functions
  func validateInputSizes(name : Text, email : Text, message : Text) {
    if (name.size() > 100) { Runtime.trap("Name too long. Max 100 characters.") };
    if (email.size() > 100) { Runtime.trap("Email too long. Max 100 characters.") };
    if (message.size() > 2000) { Runtime.trap("Message too long. Max 2000 characters.") };
  };

  func isAnonymousCaller(caller : Principal) : Bool {
    switch (caller.toText()) {
      case ("2vxsx-fae") { true };
      case (_) { false };
    };
  };

  func checkRateLimit(caller : Principal, now : Int) {
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

  func addContactWithLimit(contact : Contact) {
    if (submissions.size() >= maxSubmissions) {
      ignore submissions.removeLast();
    };
    submissions.add(contact);
  };

  func sliceArray(array : [Contact], start : Nat, end : Nat) : [Contact] {
    let subArraySize = end - start;
    Array.tabulate(
      subArraySize,
      func(i) {
        array[start + i];
      },
    );
  };
};
