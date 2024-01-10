import { Fds } from "./Fds";

export interface Produits{
    id : number;
    nom : string;
    fiches : Array<Fds>
}