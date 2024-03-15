import TableView from "./TableView";

export default function WelcomePage() {
    const JsonData = { 
        "Elements": [
            {
                "id": 0,
                "number": 123,
                "street": "Cherry",
                "suf": "st",
                "ListingPrice": 100000,
                "CashFlow": 100
            },
            {
                "id": 1,
                "number": 100,
                "street": "Michigan",
                "suf": "av",
                "ListingPrice": 1000000,
                "CashFlow": 1000
            },
            {
                "id": 2,
                "number": 69,
                "street": "Miranda",
                "suf": "dr",
                "ListingPrice": 150000,
                "CashFlow": 500
            }
        ]   
    };

    return (
        <div>
            <h1>This is the DatabaseView Page</h1>
            <TableView data={JsonData}></TableView>
        </div>
        
    );
}