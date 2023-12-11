export interface CategoryType {
    _id: string;
    id: number;
    name: string;
    image: string;
}

export interface ProductType {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: CategoryType;
    images: string[];
}
