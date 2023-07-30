export type PeopleType = {
"birth_date": string;
"created_at": string;
"death_date": string;
"grave": string;
"id": string;
"name": string;
"surname": string;
}

export type GraveType = {
    "created_at": string;
    "graveyard": string;
    "id": string;
    "img": string;
    "people": PeopleType[];
}


export type GraveyardType = {
    "created_at": string;
    "id": string;
    "name": string;
    "lat": number;
    "lng": number;
}





