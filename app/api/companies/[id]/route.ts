import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const response = await fetch(`${process.env.API_URL}/companies/${params.id}`);
        const company = await response.json();

        return NextResponse.json(company);
    } catch (error) {
        console.error('Error fetching company:', error);
        return NextResponse.json({ error: 'Failed to fetch company' }, { status: 500 });
    }
}