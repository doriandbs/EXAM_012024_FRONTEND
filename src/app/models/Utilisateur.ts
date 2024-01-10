import { Produits } from "./Produit";

export interface Utilisateur{
    username : string;
    password: string;
    produits : Array<Produits>;
}