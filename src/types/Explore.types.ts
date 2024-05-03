export type  ExploreProps = {
    Post: string ;
    id: number | string;
    Profile: string;
    name: string;
    Like: number | string;
    Share: number | string;
    Comment: number | string;
    Description: string;
    location: string;
    UUID:string;
    following:boolean;
}


export type LeftProps = {  
    Like: number | string;
    Share: number | string;
    Comment: number | string;
    id: number | string;
    UUID:string;
}

export type UserProfileTypes = {  
    Profile: string ;
    name: string;
    Description: string;
    location: string;
    following:boolean;
    UUID:string;
}

export type CreatorDetails = {
    DateOfBirth: string,
    Displayname:string,
    Email:string,
    Gender:string,
    isFollowing:boolean,
    Latitude:number,
    Longitude:number,
    Phone:string,
    ProfilePic:string,
    SuperTokensUserID:string,
    Username:string
  }
  
export type Details = {
    Description: string,
    HeaderImage: string,
    Itineraries: [],
    NoOfReviews: number,
    Rating: number,
    Reviews: [],
    Tags: [],
    Title:string
  }
  
export type Experience = {
    CreatorDetails:  CreatorDetails;
    CreatorID: string;
    Details: Details; // Define the structure of Details if it varies
    EpicComments?: []; // Define the structure of EpicComments if it varies
    EpicDescription: string;
    EpicURL: string;
    ExperienceUUID: string;
    Index: number;
    IsLiked: boolean;
    Likes: number;
    Location: string;
    Shares: number;
    _id: string;
  }
  