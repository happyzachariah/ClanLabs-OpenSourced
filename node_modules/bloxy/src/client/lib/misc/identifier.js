

exports.init = function (self) {

	let classes = self._setup.classes;

	return {

		isUser: function (identifier) {

			let userId, username;

			if (self.misc.isClass(identifier, [classes.RobloxUser, classes.PartialUser, classes.FriendRequest, classes.GroupJoinRequest, classes.UserSearchResult])) {
                
				// Is a class
				userId = (identifier || {}).userId;
				username = (identifier || {}).username;

			} else if (parseInt((identifier || "")) != null) {
                
				// Is a string or number 
				userId = parseInt(identifier);

			}
            
			return [userId != null, userId, username];
		},
        
		isRole: function (identifier) {

			let roleId;

			if (self.misc.isClass(identifier, classes.GroupRole)) {
                
				// Is a class
				roleId = identifier.id;
			} else if (parseInt((identifier || "")) != null) {
                
				// Is a string or number
				roleId = parseInt(identifier);
			}
            
			return [roleId != null, roleId];

		},
        
		isGroup: function (identifier) {

			let groupId;

			if (self.misc.isClass(identifier, [classes.RobloxGroup, classes.PartialGroup, classes.GroupJoinRequest, classes.GroupWallPost, classes.MyGroupPermissions, classes.GroupSearchResult])) {
				groupId = identifier.groupId;
			} else if (parseInt((identifier || "")) != null) {
				groupId = parseInt(identifier);
			}

			return [groupId != null, groupId];
		}
	};

};