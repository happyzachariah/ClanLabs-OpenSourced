

class UserFunctions {
	constructor () {

	}

	async acceptFriendRequest () {
		return this.self.acceptFriendRequest(this.userId);
	}

	async block () {
		return this.self.blockUser(this.userId);
	}

	async canManageAsset (assetId) {
		return this.self.canManageAsset(this.userId, assetId);
	}

	async declineFriendRequest () {
		return this.self.declineFriendRequest(this.userId);
	}

	async follow () {
		return this.self.followUser(this.userId);
	}

	async friend () {
		return this.self.friendUser(this.userId);
	}

	async getFollowers (page) {
		return this.self.getFollowers(this.userId, page);
	}

	async getFollowing (page) {
		return this.self.getFollowing(this.userId, page);
	}

	async getFriends (page) {
		return this.self.getFriends(this.userId, page);
	}

	async getNumFriends () {
		return this.self.getNumFriends(this.userId);
	}

	async getGroups () {
		return this.self.getUserGroups(this.userId);
	}

	async getUser () {
		return this.self.getUser(this.userId);
	}

	async getRobloxBadges () {
		return this.self.getRobloxBadges(this.userId);
	}

	async getVerificationStatus () {
		return this.self.getVerificationStatus(this.userId, "roblox");
	}

	async isFriends (userId) {
		return this.self.isFriends(this.userId, userId);
	}

	async messageUser (subject, body) {
		return this.self.messageUser(this.userId, subject, body);
	}

	async ownsAsset (assetId) {
		return this.self.ownsAsset(this.userId, assetId);
	}

	async ownsGamepass (passId) {
		return this.self.ownsGamepass(this.userId, passId);
	}

	async unblock () {
		return this.self.unblockUser(this.userId);
	}

	async unfollow () {
		return this.self.unfollowUser(this.userId);
	}

	async unfriend () {
		return this.self.unfriendUser(this.userId);
	}

}

class PartialGroupFunctions {

}

exports.RobloxGroup = require("../../group/group");
exports.GroupFunctions = require("../../group/GroupFunctions");


exports.RobloxUser = class RobloxUser extends UserFunctions {


	constructor (data, self) {
		super();

		this.self = self;

		this.userId = Number(data.UserId || data.userId || data.userid || data.Id);
		this.username = (data.Username || data.username || data.Name || data.name || data.userName).toString();
		this.status = (data.Status || data.status).toString();
		this.blurb = (data.Blurb || data.blurb).toString();

		this.joinDate = new Date(data.JoinDate || data.joinDate || data.joindate);
		this.accountAge = Number(data.AccountAge || data.accountAge || data.age || data.Age);
		this.membership = Memberships[(data.BC || data.bc || data.membership || data.Membership || data.buildersClubMembershipType || data.memberShip || data.MemberShip || "undefined").toString().toLowerCase()];
		this.numFriends = Number(data.numFriends || data.NumFriends || data.numfriends);

		this.profilePicture = (data.pfp).toString();
		this.avatarPicture  = (data.avatarPic).toString();
	}

};

exports.PartialUser =  class PartialUser extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.userId = parseInt(data.UserId || data.userId || data.userid || data.Id);
		this.username = (data.Username || data.username || data.Name || data.name || data.userName || data.UserName).toString();
		this.membership = Memberships[(data.BuildersClubStatus || data.BC || data.bc || data.Membership || data.membership || data.buildersClubMembershipType || "undefined").toString().toLowerCase()];

	}
    
};


exports.RobloxMessage = class RobloxMessage {
	constructor (message, self) {
		
		this.self = self;

		this.messageId = message.Id;
		this.sender    = new exports.PartialUser(message.Sender, self);
		this.recipient = new exports.PartialUser(message.Recipient, self);

		this.subject = message.Subject;
		this.body 	 = message.Body;
		this.created = new Date(message.Created);
		this.updated = new Date(message.Updated);

		this.isRead  = (message.IsRead === true);
		this.isSystemMessage = (message.IsSystemMessage === true);
	}
};

exports.FriendRequest = class FriendRequest extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.userId = data.UserId;
		this.username = data.Username;
		this.thumbnail = data.Thumbnail;
		this.onlineStatus = data.OnlineStatus;
		this.invitationId = data.InvitationId;
		this.isOnline = data.IsOnline === true;

	}

	async accept () {
		return this.self.acceptFriendRequest(this.userId);
	}

	async decline () {
		return this.self.declineFriendRequest(this.userId);
	}

};


exports.PartialGroup = class PartialGroup extends exports.GroupFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.name = (data.Name || data.name || "").toString();
		this.groupId = parseInt(data.id || data.Id || data.Groupid || data.GroupId || data.groupId || data.groupid);
		this.emblemUrl = (data.EmblemUrl || data.emblem || data.emblemUrl || "").toString();

	}
};

exports.UserGroup = class UserGroup extends exports.GroupFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.group = new exports.PartialGroup({name: data.Name, groupId: data.Id, emblem: data.EmblemUrl});
		this.userRank = parseInt(data.Rank || data.rank);
		this.userRole = (data.Role || data.role).toString();
		this.isPrimary = (data.IsPrimary === true || data.isPrimary === true);
		this.isInClan = (data.IsInClan === true || data.isInClan === true);

	}
};



exports.GroupJoinRequest = class GroupJoinRequest extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.username = (data.username || data.Username).toString();
		this.userId = parseInt(data.UserId || data.userId || data.Id);
		this.date = new Date(data.date);
		this.requestId = parseInt(data.requestId);
		this.groupId = data.groupId;

	}

	async accept () {
		return this.acceptJoinRequest(this.requestId);
	}

	async decline () {
		return this.declineJoinRequest(this.requestId);
	}
};



exports.GroupWallPost = class GroupWallPost extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.postId = parseInt(data.id);
		this.groupId = parseInt(this.groupId);
		this.poster = new exports.PartialUser(data.poster, self);
		this.body = data.body;
		this.created = new Date(data.created);
		this.updated = new Date(data.updated);
	}

	async delete () {
		return this.deleteWallPost(this.postId);
	}

	async deletePostsFromUser () {
		return this.deleteWallPostsByUser(this.poster.userId);
	}

	async exileUser () {
		return this.exileUser(this.poster.userId);
	}

};



exports.GroupPermissions = class GroupPermissions {

	constructor (data, self) {

		this.groupId = data.groupId;
		this.isPrimary = data.isPrimary == true;
		this.isPendingJoin = data.isPendingJoin == true;

		this.userRole = {
			user: new exports.PartialUser(data.userRole.user, self),
			role: {
				id: data.userRole.role.id,
				name: data.userRole.role.name,
				rank: data.userRole.role.rank
			}
		};

		this.maxGroups = data.maxGroups;
		this.permissions = {
			groupPostsPermissions: {
				viewWall: data.permissions.groupPostsPermissions.viewWall == true,
				postToWall: data.permissions.groupPostsPermissions.postToWall == true,
				deleteFromWall: data.permissions.groupPostsPermissions.deleteFromWall == true,
				viewStatus: data.permissions.groupPostsPermissions.viewStatus == true,
				postToStatus: data.permissions.groupPostsPermissions.postToStatus == true
			},

			groupMembershipPermissions: {
				changeRank: data.permissions.groupMembershipPermissions.changeRank == true,
				inviteMembers: data.permissions.groupMembershipPermissions.inviteMembers == true,
				removeMembers: data.permissions.groupMembershipPermissions.removeMembers == true
			},

			groupManagementPermissions: {
				manageRelationships: data.permissions.groupManagementPermissions.manageRelationships == true,
				manageClan: data.permissions.groupManagementPermissions.manageClan == true,
				viewAuditLogs: data.permissions.groupManagementPermissions.viewAuditLogs == true
			},

			groupEconomyPermissions: {
				spendGroupFunds: data.permissions.groupEconomyPermissions.spendGroupFunds == true,
				advertiseGroup: data.permissions.groupEconomyPermissions.advertiseGroup == true,
				createItems: data.permissions.groupEconomyPermissions.createItems == true,
				manageItems: data.permissions.groupEconomyPermissions.manageItems == true,
				addGroupPlaces: data.permissions.groupEconomyPermissions.addGroupPlaces == true,
				manageGroupGames: data.permissions.manageGroupGames == true
			}
		};

	}
};



exports.GroupAuditLog = class GroupAuditLog {
	constructor (data, self) {

		this.self = self;

		this.action = data.action;
		this.user = new exports.PartialUser(data.user, self);
		this.date = new Date(data.date);

	}
};

exports.GroupRole = class GroupRole {

	constructor (data, self) {
		
		this.self = self;

		this.name = (data.Name || data.name).toString(),
		this.rank = parseInt(data.rank || data.Rank);
		this.id = parseInt(data.id || data.Id);
	}

};

exports.GroupSearchResult = class GroupSearchResult extends PartialGroupFunctions {

	constructor (data, self) {
		super();

		this.self = self;
		
		this.bcOnly = data.BcOnlyJoin;
		this.description = data.Description;
		this.groupId = data.ID;
		this.name = data.Name;
		this.publicEntryAllowed = data.PublicEntryAllowed;
		this.numMembers = data.Members;
		this.groupUrl = data.GroupUri;
		this.thumbnail = {
			final: data.Thumbnail.final,
			url: data.Thumbnail.Url
		};
	}

};


exports.UserSearchResult = class UserSearchResult extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;
		
		this.userId = data.UserId;
		this.username = data.Name;
		this.blurb = data.Blurb;
		this.isOnline = data.IsOnline === true;
		this.primaryGroup = {groupId: (data.PrimaryGroupUrl.match(/\d+/g) != null ? data.PrimaryGroupUrl.match(/\d+/g)[0] : null), name: data.PrimaryGroup};
	}
};

exports.MembersWithRoleResult = class MembersWithRoleResult {

	constructor (data, role, self) {
		this.self = self;

		this.role = role;
		this.previousPageCursor = data.previousPageCursor;
		this.nextPageCursor = data.nextPageCursor;
		this.users = data.data.map(x=> new exports.PartialUser(x, self));
	}

	async next () {
		return this.self.getUsersWithRole(this.role, this.nextPageCursor);
	}

	async previous () {
		return this.self.getUsersWithRole(this.role, this.previousPageCursor);
	}
};

exports.GroupWallResult = class GroupWallResult {

	constructor (data, self) {
		this.self = self;

		this.previousPageCursor = data.previousPageCursor;
		this.nextPageCursor = data.nextPageCursor;
		this.posts = data.data.map(x=> new exports.GroupWallPost(x, self));
	}

	async next () {
		return this.self.getWall(this.nextPageCursor);
	}

	async previous () {
		return this.self.getWall(this.previousPageCursor);
	}
};


exports.GroupShout = class GroupShout {
	constructor (data, self) {

		this.self = self;
		this.body = (data || {}).body;
		this.poster = (data && data.poster !== null ? new exports.PartialUser(data.poster, self) : null);
		this.created = new Date((data || {}).created);

	}
};



exports.ProductInfo = class ProductInfo {

	constructor (data, self) {

		this.self = self;

		this.targetId = data.TargetId;
		this.productType = data.ProductType;
		this.assetId = data.AssetId;
		this.productId = data.ProductId;
		this.name = data.Name;
		this.description = data.Description;
		this.assetTypeId = data.AssetTypeId;
		this.creator = new exports.PartialUser(data.Creator, self);
		this.iconImageAssetId = data.IconImageAssetId;
		this.created = new Date(data.Created);
		this.updated = new Date(data.Updated);
		this.price = data.PriceInRobux;
		this.isNew = data.IsNew == true;
		this.isForSale = data.IsForSale == true;
		this.isPublicDomain = data.IsPublicDomain == true;
		this.isLimited = data.IsLimited;
		this.isLimitedUnique = data.IsLimitedUnique;
		this.remining = data.Remaining;
		this.minimumMembershipLevel = data.MinimumMembershipLevel;
		this.contentRatingTypeId = data.ContentRatingTypeId;
	}

	async buy () {

	}

	async deleteFromInventory () {

	}
};


exports.RobloxBadge = class RobloxBadge {

	constructor (data, self) {

		this.self =self;

		this.imageUrl = data.ImageUri;
		this.name = data.Name;
	}
};


exports.RoVerDiscordResponse = class RoVerDiscordResponse {
	constructor (data) {
		this.userIds = data.users;
	}
};

exports.RoVerRobloxResponse = class RoVerRobloxResponse extends UserFunctions {
	
	constructor (data, self) {
		super();

		this.self = self;

		this.username = data.robloxUsername;
		this.robloxId = data.robloxId;

	}
};


const Memberships = {

	nbc: "NBC",
	bc:  "BC",
	tbc: "TBC",
	obc: "OBC",
	0: "NBC",
	1: "BC",
	2: "TBC",
	3: "OBC",
	"undefined": undefined

};

exports.ENUM = {
	actionTypeId: {
		"Delete Post": 1,
		"Accept Join Request": 2,
		"Decline Join Request": 3,
		"Post Status": 4,
		"Change Rank": 5,
		"Buy Ad": 6,
		"Send Ally Request": 7,
		"Create Enemy": 8,
		"Accept Ally Request": 9,
		"Decline Ally Request": 10,
		"Delete Ally": 11,
		"Delete Enemy": 12,
		"Add Group Place": 13,
		"Remove Group Place": 14,
		"Create Items": 15,
		"Configure Items": 16,
		"Spend Group Funds": 17,
		"Change Owner": 18,
		"Delete": 19,
		"Rename": 20,
		"Abandon": 21,
		"Claim": 22,
		"Change Description": 23,
		"AdjustCurrencyAmounts": 24,
		"Invite to Clan": 25,
		"Kick from Clan": 26,
		"Cancel Clan Invite": 27,
		"Buy Clan": 28,
		"Create Group Asset": 29,
		"Update Group Asset": 30,
		"Configure Group Asset": 31,
		"Revert Group Asset": 32,
		"Create Group Developer Product": 33,
		"Configure Group Game": 34,
		"Lock": 35,
		"Unlock": 36,
		"Create Game Pass": 37,
		"Create Badge": 38,
		"Configure Badge": 39,
		"Save Place": 40,
		"Publish Place": 41
	},

	actionType: {}
};

Object.keys(exports.ENUM.actionTypeId).map(k => exports.ENUM.actionType[exports.ENUM.actionTypeId[k]] = k);