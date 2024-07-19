import { connectMongoDB } from './dbconn.js';
import Album from '../../models/albums.js'; 
import { NextResponse } from 'next/server.js';

export async function POST(request) {
    try {
   
        const { id, imageURL, name, artist } = await request.json();
        console.log('Request Payload:', { id, imageURL, name, artist });

        await connectMongoDB(); 
        
        console.log('Database connected successfully.');

        const newAlbum = new Album({ id, imageURL, name, artist });
        await newAlbum.save();
        return NextResponse.json({ message: "posted album" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "failed to post album" }, { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB()
    const albums = await Album.find()
    return NextResponse.json(albums)
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB;
    await Album.findByIdAndDelete(id)
    return NextResponse.json({message:"topic deleted"});
}