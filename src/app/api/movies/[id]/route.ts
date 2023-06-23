import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
export const dynamic = 'auto'
export async function GET(request: Request, context: { params: any }) {
  const { id: movieId } = context.params


  try {

    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieId) {
      throw new Error('Missing Id');
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    return NextResponse.json(movie, { status: 200 })



  } catch (error) {
    console.log(error);
  }
}
