import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";

export default function page() {
    return <CardList isLoading cards={
        Array.from({ length: 4 }, (_, i) => ({
            title: `Loading ${i}`,
            description: `Loading ${i}`,
            content: `Loading ${i}`,
            footer: `Loading ${i}`,
        }))
    }></CardList>
}