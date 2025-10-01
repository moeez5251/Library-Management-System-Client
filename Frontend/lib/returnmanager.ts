"use client";
export async function returnbook( bookid:string, userid:string, borrower_ID:number ):Promise<void> {
    const data = await fetch("http://127.0.0.1:8000/lenders/returnbook", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userid,
          book_id: bookid,
          borrower_id: borrower_ID.toString()
        })
    })
    if (!data.ok) {
        throw new Error("Unable to return book")
    }

}