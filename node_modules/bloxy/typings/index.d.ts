import * as classes from './classes';
import * as request from "request";


declare module 'bloxy' {
    


    import {EventEmitter} from "events";

    export class BloxyClient {

        constructor (options?: BloxyClientOptions);

        public userId: number;
        public _setup: BloxySetup;

        // Methods

        public acceptFriendRequest (userId: number | RobloxUser | PartialUser): Promise<boolean>;
        public addDeveloperProduct (options: DeveloperProductOptions): Promise<number>;
        public archiveMessages (messageIds: Array<RobloxMessage | number>): Promise<{ success: boolean; messages: Array<number>}>;
        public blockUser (userId: number | PartialUser | RobloxUser): Promise<{success: boolean; userId: number}>;
        public buyAsset (productId: number, expectedPrice: number, sellerId: number): Promise<{success: boolean; productId: number; price: number; sellerId: number}>;
        public canManageAsset (userId: number, assetId: number): Promise<boolean>;
        public changeBlurb (newBlurb: string): Promise<{success: boolean; newBlurb: string}>;
        public changeStatus (newStatus: string): Promise<{success: boolean; newStatus: string}>;
        public configureItem (setup: ConfigureItemOptions): Promise<{success: boolean}>;
        public declineFriendRequest (userId: number | RobloxUser | PartialUser): Promise<{success: boolean; userId: number}>;
        public deleteFromInventory (assetId: number): Promise<{success: boolean; assetId: number}>;
        public followUser (userId: number | RobloxUser | PartialUser): Promise<{success: boolean; userId: number}>;
        public friendUser (userId: number | RobloxUser | PartialUser): Promise<{success: boolean; userId: number}>;
        public getArchivedMessages (page: number, limit: number): Promise<GetArchivedMessagesResponse>;
        public getCurrency (): Promise<number>;
        public getFollowers (userId: number | RobloxUser | PartialUser, page): Promise<GetFollowersResponse>;
        public getFollowing (userId: number | RobloxUser | PartialUser, page): Promise<GetFollowingResponse>;
        public getFriendRequests (page: number): Promise<GetFriendRequestsResponse>;
        public getFriends (userId: number | RobloxUser | PartialUser, page?: number): Promise<Array<PartialUser>>;
        public getFriendsOnline (): Promise<Array<PartialUser>>;
        public getGroup (groupId: number): Promise<RobloxGroup>;
        public getGroupsIManage (): Promise<Array<PartialGroup>>;
        public getIdByUsername (username: string): Promise<number>;
        public getMessages (page: number, limit: number): Promise<{currentPage: number; totalPages: number; messages: Array<RobloxMessage>}>;
        public getNumFriends (userId: number | RobloxUser | PartialUser): Promise<number>;
        public getProductInfo (assetId: number): Promise<ProductInfo>;
        public getUserGroups (userId: number | RobloxUser | PartialUser): Promise<Array<UserGroup>>;
        public getUsernameById (userId: number): Promise<string>;
        public getUserPrimaryGroup (userId: number | RobloxUser | PartialUser): Promise<UserGroup | null>;
        public getUserRobloxBadges (userId: number | RobloxUser | PartialUser): Promise<Array<RobloxBadge>>;
        public getVerificationStatus (identifier: number, platform: "roblox"): Promise<RoVerDiscordResponse>;
        public getVerificationStatus (identifier: string, platform: "discord"): Promise<RoVerRobloxResponse>;
        public isFriends (userId1: number | RobloxUser | PartialUser, userId2: number | RobloxUser | PartialUser): Promise<boolean>;
        public isNameTaken (username: string): Promise<boolean>;
        public markMessagesRead (messages: Array<RobloxMessage | number>): Promise<{success: true}>;
        public markMessagesUnread (messages: Array<RobloxMessage | number>): Promise<{success: true}>;
        public messageUser (userId: number | RobloxUser | PartialUser, subject: string, body: string): Promise<{success: boolean, userId: number}>;
        public moveMessagesToInbox (messages: Array<RobloxMessage | number>): Promise<{success: boolean}>;
        public ownsAsset (userId: number, assetId: number): Promise<boolean>;
        public ownsGamepass (userId: number | RobloxUser | PartialUser, passId: number): Promise<boolean>;
        public redeemPromoCode (code: string): Promise<{success: boolean}>;
        public searchGroups (query: string): Promise<SearchGroupsResult>;
        public searchUsers (query: string): Promise<SearchUsersResult>;
        public unblockUser (userId: number | RobloxUser | PartialUser): Promise<{success: boolean, userId: number}>;
        public unfollowUser (userId: number | RobloxUser | PartialUser): Promise<{success: boolean, userId: number}>;
        public unfriendUser (userId: number | RobloxUser | PartialUser): Promise<{success: boolean, userId: number}>;
        public uploadAsset (options: UploadAssetOptions): Promise<number>;

        public login (options: BloxyClientOptions): Promise<any>;
        public logout ();
        public commitDie ();
    }




    class BloxySetup {

        constructor (identifier: number, client: BloxyClient);

        public request: RequestManager;
        public xcsrf: xcsrfManager;
        public cache: CacheManager;
        public captchaManager: CaptchaManager;
        public classes: any;
        public _id: number;
        public _client: BloxyClient;
        public authorized: boolean;
        public authTab: authTab;
        

    }



    class RequestManager {

        constructor (self: BloxySetup);

        public jar: request.CookieJar;
        public setup: BloxySetup;
        public xcsrfManager: xcsrfManager;
        public proxy: string;
        public module: any;
        
        public createCookie (key: string, value: string, domain: string, hostOnly: boolean, httpOnly: boolean);

        // Methods

        public request (url: string, options: BloxyRequestOptions, ...args: any): Promise<request.Response>;
        public setXcsrfManager (self: xcsrfManager);
        public setProxy (proxy: string);
        public getVerification (url: string): Promise<{inputs: object, match: object}>;
    }


    class xcsrfManager {

        constructor (requestManager: RequestManager);

        public token: string;
        public requestInterval: NodeJS.Timer;
        public requestManager: RequestManager;

        public refresh (): Promise<string>;
        public startInterval (updateRate: number);
        public stopInterval ();
    }


    class CacheManager {
        constructor ();

        public cacher: any;
        public group: any;
        public user: any;

        public init (): Promise<any>;
        public cacheUser (userId: string, userData: any): Promise<any>;
        public getUserCache (userId: string): Promise<any>;
        public deleteUserCache (): Promise<any>;
        public cacheGroup (groupId: string, groupData: any): Promise<any>;
        public getGroupCache (groupId: string): Promise<any>;
        public deleteGroupCache (): Promise<any>;
    }

    class CaptchaManager {

        constructor (self: BloxySetup);

        public setup: BloxySetup;


        public solveCaptcha (url: string): Promise<string>;
        public verifyCaptchaUser (captchaResponse: string, setup: BloxyClient): Promise<any>;
        public verifyCaptchaLogin (captchaResponse: string, setup: BloxyClient): Promise<any>;
        public verifyCaptchaSignup (captchaResponse: string, setup: BloxyClient): Promise<any>;
        public verifyCaptchaMessage (captchaResponse: string, setup: BloxyClient): Promise<any>;

    }








    class UserFunctions {
        constructor ();

        public acceptFriendRequest (): Promise<boolean>;
        public block (): Promise<{success: boolean, userId: number}>;
        public canManageAsset (assetId: number): Promise<boolean>;
        public declineFriendRequest (): Promise<{success: boolean, userId: number}>;
        public follow (): Promise<{ success: boolean, userId: number}>;
        public friend (): Promise<{ success: boolean, userId: number}>;
        public getFollowers (page?: number): Promise<Array<PartialUser>>;
        public getFollowing (page?: number): Promise<Array<PartialUser>>;
        public getFriends (page?: number): Promise<Array<PartialUser>>;
        public getNumFriends (): Promise<number>;
        public getGroups (): Promise<Array<UserGroup>>;
        public getUser (): Promise<RobloxUser>;
        public getRobloxBadges (): Promise<Array<RobloxBadge>>;
        public getVerificationStatus (): Promise<RoVerDiscordResponse>;
        public isFriends (userId: number): Promise<boolean>;
        public messageUser (subject: string, body: string): Promise<{success:boolean, userId: number}>;
        public ownsAsset (assetId: number): Promise<boolean>;
        public ownsGamepass (passId: number): Promise<boolean>;
        public unblock (): Promise<{success: boolean, userId: number}>;
        public unfollow (): Promise<{success: boolean, userId: number}>;
        public unfriend (): Promise<{success: boolean, userId: number}>;
    }

    class PartialGroupFunctions {
        constructor ();
    }

    class RobloxGroup extends GroupFunctions {
        constructor (data:any, self:BloxyClient);

        public groupId: number;
        public name: string;
        public description: string;
        public owner: PartialUser;
        public shout: GroupShout | null;
        public memberCount: number;

    }

    class GroupFunctions {
        constructor ();

        public acceptJoinRequest (requestId: number | GroupJoinRequest): Promise<boolean>;
        public changeRank (userId: number | RobloxUser | PartialUser, amount: number): Promise<{old: GroupRole, new: GroupRole, userId: number}>;
        public declineJoinRequest (requestId: number | GroupJoinRequest): Promise<boolean>;
        public deleteWallPost (postId: number | GroupWallPost): Promise<boolean>;
        public deleteWallPostsByUser (userId: number | RobloxUser | PartialUser): Promise<boolean>;
        public demote (userId: number | RobloxUser | PartialUser): Promise<{old: GroupRole, new: GroupRole, userId: number}>;
        public exileUser (userId: number | RobloxUser | PartialUser): Promise<{success: true, userId: number}>;
        public getAuditLogs ()
        public getFunds (): Promise<number>;
        public getJoinRequests (setup: { username?: string, page?: number}): Promise<Array<GroupJoinRequest>>;
        public getPermissions (): Promise<MyGroupPermissions>;
        public getRankName (userId: number | RobloxUser | PartialUser): Promise<string>;
        public getRole (setup: { rank?: number, name?: string, id?: number} ): Promise<GroupRole>;
        public getRoles (overrideCache?: boolean): Promise<Array<GroupRole>>;
        public getMembers (page?: number): Promise<Array<any>>;
        public getMembersWithRole (roleId: number | GroupRole, pageCursor?: string): Promise<MembersWithRoleResult>;
        public getWall (pageCursor?: string): Promise<GroupWallResult>;
        public isMember (userId: number | RobloxUser | PartialUser): Promise<UserGroup>;
        public join (): Promise<boolean>;
        public onChange (checkInterval?: number): Promise<GroupChangeEvent>;
        public onJoinRequest (checkInterval?: number): Promise<JoinRequestEvent>;
        public payout (setup: PayoutOptions): Promise<boolean>;
        public postOnWall (message: string): Promise<GroupWallPost>;
        public postShout (message: string): Promise<GroupShout>;
        public promote (userId: number | RobloxUser | PartialUser): Promise<{ old: GroupRole, new: GroupRole, userId: number}>;
        public setPrimary (): Promise<boolean>;
        public setRank (userId: number | RobloxUser | PartialUser, roleId: number | GroupRole, groupId?: number | RobloxGroup | PartialGroup | UserGroup): Promise<boolean>;
    }

    class RobloxUser extends UserFunctions {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;
        
        public userId: number;
        public username: string;
        public status: string;
        public blurb: string;
        public joinDate: Date;
        public accountAge: number;
        public membership: membership;
        public numFriends: number;
        public profilePicture: string;
        public avatarPicture: string;

    }

    class PartialUser extends UserFunctions {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;

        public userId: number;
        public username: string;
        public membership: membership;

    }

    class RobloxMessage {

        constructor (message: any, self: BloxyClient);

        public self: BloxyClient;

        public messageId: number;
        public sender: PartialUser;
        public recipient: PartialUser;
        public subject: string;
        public body: string;
        public created: Date;
        public updated: Date;
        public isRead: boolean;
        public isSystemMessage: boolean;

    }


    class FriendRequest extends UserFunctions {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;

        public userId: number;
        public username: string;
        public thumbnail: string | undefined;
        public onlineStatus: any;
        public invitationId: number | undefined;
        public isOnline: boolean;

        public accept (): Promise<any>;
        public decline (): Promise<any>;
    }


    class PartialGroup extends GroupFunctions {

        constructor (data:any, self: BloxyClient);

        public self: BloxyClient;

        public name: string;
        public groupId: number;
        public emblemUrl: string | undefined;

    }


    class UserGroup extends GroupFunctions {
        
        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;
        
        public group: PartialGroup;
        public userRank: number;
        public userRole: string;
        public isPrimary: boolean;
        public isInClan: boolean;

    }

    class GroupJoinRequest extends UserFunctions {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;

        public username: string;
        public userId: number;
        public date: Date;
        public requestId: number;
        public groupId: number;

        public accept ();
        public decline ();
    }


    class GroupWallPost extends UserFunctions {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;

        public postId: number;
        public groupId: number;
        public poster: PartialUser;
        public body: string;
        public created: Date;
        public updated: Date;

        public delete (): Promise<any>;
        public deletePostsFromUser (): Promise<any>;
        public exileUser (): Promise<any>;
    }


    class MyGroupPermissions {
        constructor (data: any, self: BloxySetup);
        public groupId: number;
        public isPrimary: boolean;
        public isPendingJoin: boolean;
        public userRole: {
            user: PartialUser,
            role: {
                id: number;
                name: string;
                rank: number;
            }
        };
        public maxGroups: number;
        public permissions: {
            groupPostsPermissions: {
                viewWall: boolean;
                postToWall: boolean;
                deleteFromWall: boolean;
                viewStatus: boolean;
                postToStatus: boolean;
            };
            groupMembershipPermissions: {
                changeRank: boolean;
                inviteMembers: boolean;
                removeMembers: boolean;
            };
            groupManagementPermissions: {
                manageRelationship: boolean;
                manageClan: boolean;
                viewAuditLogs: boolean;
            };
            groupEconomyPermissions: {
                spendGroupFunds: boolean;
                advertiseGroup: boolean;
                createItems: boolean;
                manageItems: boolean;
                addGroupPlaces: boolean;
                manageGroupGames: boolean;
            }
        }
    }


    class GroupAuditLog {
        
        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;

        public action: string;
        public user: PartialUser;
        public date: Date;

    }

    class GroupRole {

        constructor(data: any, self: BloxyClient);

        public self: BloxyClient;

        public name: string;
        public rank: number;
        public id: number;
    }



    class GroupSearchResult extends PartialGroupFunctions {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;

        public bcOnly: boolean;
        public description: string;
        public groupId: number;
        public name: string;
        public publicEntryAllowed: boolean;
        public numMembers: number;
        public groupUrl: string;
        public thumbnail: {
            final: boolean;
            url: string;
        }
    }

    class GroupShout {
        
        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;
        public body: string | null;
        public poster: PartialUser | null;
    }

    class ProductInfo {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;
        
        public targetId: number;
        public productType: any;
        public assetId: number;
        public productId: number;
        public name: string;
        public description: string;
        public assetTypeId: number;
        public creator: PartialUser;
        public iconImageAssetId: string;
        public created: Date;
        public updated: Date;
        public price: number;
        public isNew: boolean;
        public isForSale: boolean;
        public isPublicDomain: boolean;
        public isLimited: boolean;
        public isLimitedUnique: boolean;
        public remaining: number | null;
        public minimumMembershipLevel: any;
        public contentRatingTypeId: any;

        public buy (): Promise<any>;
        public deleteFromInventory (): Promise<any>;
    }


    class RobloxBadge {
        constructor (data: any, self: BloxyClient);

        public imageUrl: string;
        public name: string;
    }


    class RoVerDiscordResponse {

        constructor (data: any);
        public userIds: Array<string>;
    }

    class RoVerRobloxResponse {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;
        public username: string;
        public userId: number;

    }


    class UserSearchResult extends UserFunctions {

        constructor (data: any, self: BloxyClient);

        public self: BloxyClient;

        public userId: number;
        public username: string;
        public blurb: string;
        public isOnline: boolean;
        public primaryGroup: {groupId: number; name: string};
    }

    class GroupChangeEvent extends EventEmitter {

        constructor (group: RobloxGroup | PartialGroup, checkInterval?: number);

        private readonly group: RobloxGroup | PartialGroup;
        private readonly checkInterval: number;
        private readonly cache: object;

        private init (): Promise<any>;

        public stop ();

        /**
         * Fired once ready to detect group changes
         * @param event The "ready" event
         * @param listener Callback
         */
        public on(event: "ready", listener: () => void): this;

        /**
         * Fired when a new shout has appeared on the group
         * @param event shout
         * @param listener Callback
         */
        public on(event: "shout", listener: (shout: { old: GroupShout, new: GroupShout}) => void): this;
        /**
         * Fired when a new description has appeared on the group
         * @param event description
         * @param listener Callback
         */
        public on(event: "description", listener: (description: { old: string, new: string}) => void): this;
        /**
         * Fired when it has stopped detecting for new changes
         * @param event done
         * @param listener callback
         */
        public on(event: "done", listener: () => void): this;
    }

    class JoinRequestEvent extends EventEmitter {
        public on(event: "ready", listener: () => void): this;
        public on(event: "requests", listener: (joinRequests: Array<GroupJoinRequest>) => void): this;
        public on(event: "request", listener: (joinRequest: GroupJoinRequest) => void): this;
        public on(event: "done", listener: () => void): this;

        public stop (): Promise<any>;
    }


    type BloxyClientOptions = {
        type: "username";
        value: string;
        username: string;
        password: string;
        captchaKey: string;
        cookie: string;
        proxy: string;
    };


    type BloxyRequestOptions = {
        url: string;
        method: string | "GET";
        form: any;
        body: any;
        formData: any;
        verification: any;
        captchaUrl: string;
        captchaType: "user" | "signup" | "login" | "message";
        json: object | boolean;
    };


    type ConfigureItemOptions = {
        assetId: number;
        title: string;
        description: string;
        enableComments?: boolean;
        sellForRobux?: number;
        genreSelection: any;
    };
    
    type DeveloperProductOptions = {
        universeId: number;
        name: string;
        price: number;
        description: string;
    };

    type ItemOptions = {
        assetId: number;
        title: string;
        description: string;
        enableComments: boolean;
        sellForRobux: number;
        genreSelection: string;
    };

    type MessagesOptions = {
        page: number;
        limit: number;
    };

    type FollowerOptions = {
        page: number;
        limit: number;
    };

    type UploadAssetOptions = {
        name: string;
        assetTypeId: number;
        groupId?: number;
        file: string;
    }

    type authTab = {
        value: string;
        password: string;
        signinWith: string;
        captchaKey: string;
        twostep: {
            ticket: string;
            user: string;
            code: number;
            actionType: "login";
            enabled: boolean;
            type: string;
        }
    };

    
    type GetArchivedMessagesResponse = {
        currentPage: number;
        totalPages: number;
        messages: Array<RobloxMessage>;
    }

    type GetFollowersResponse = {
        userId: number;
        totalFollowers: number;
        currentPage: number;
        totalPages: number;
        friendsType: string;
        followers: Array<PartialUser>;
    }

    type GetFollowingResponse = {
        userId: number;
        totalFollowers: number;
        currentPage: number;
        totalPages: number;
        friendsType: string;
        following: Array<PartialUser>;
    }


    type GetFriendRequestsResponse = {
        userId: number;
        totalRequests: number;
        currentPage: number;
        totalPages: number;
        friendsType: string;
        rqeuests: Array<FriendRequest>;
    }


    type SearchGroupsResult = {
        keyword: string;
        startRow: number;
        maxRows: number;
        totalResults: number;
        searchKeywordMinLength: number;
        results: Array<GroupSearchResult>;
    }

    type SearchUsersResult = {
        keyword: string;
        startIndex: number;
        maxRows: number;
        totalResults: number;
        results: Array<UserSearchResult>;
    }

    type GroupWallResult = {
        previousPageCursor?: string;
        nextPageCursor?: string;
        posts: Array<GroupWallPost>;
    }

    type MembersWithRoleResult = {
        role: GroupRole;
        previousPageCursor?: string;
        nextPageCursor?: string;
        users: Array<PartialUser>;
    }

    type PayoutOptions = {
        members: Array<{userId: number, amount: number}>;
        recurring: boolean;
        usePercentage: boolean;
    }


    type membership = "NBC" | "BC" | "TBC" | "OBC" | undefined;

    export = BloxyClient;

}