
export interface Product {
    id: number;
    category: string
    description: string,
    image: string,
    price: number,
    title: string,
    rating: {
        count: number,
        rate: number,
    },
}

export interface CartItem {
    id: number;
    title: string;
    email: string;
    price: number;
    image: string;
    count: number;
    href: string;
    removeItemCompletely?: boolean;
}
