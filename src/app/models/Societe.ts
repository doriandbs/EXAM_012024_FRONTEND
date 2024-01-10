import { Produits } from "./Produit";

export interface Societe{
    nomsociete : string;
    password: string;
    produits : Array<Produits>;
}