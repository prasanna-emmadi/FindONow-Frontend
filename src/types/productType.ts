export interface CategoryType {
    _id: string;
    id: number;
    name: string;
    image: string;
}

export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: CategoryType;
    images: string[];
}
