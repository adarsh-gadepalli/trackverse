import { connectMongoDB } from './dbconn.js';
import Album from '../../models/albums.js'; 
import { NextResponse } from 'next/server.js';

export async function POST(request) {
    const { id, imageURL, name, artist } = await request.json();

    try {
        await connectMongoDB(); 
        
        const newAlbum = new Album({ id, imageURL, name, artist });
        await newAlbum.save(); 
        
        return NextResponse.json({ message: "posted album" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to post album" }, { status: 500 });
    }
}
