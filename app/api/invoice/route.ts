import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let options = { 
            method: 'POST', 
            headers: { 
                'Content-Type':  
                    'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(req.json()),
      }

    const res = await fetch('https://invoice-generator.com/', options)

    return res
}