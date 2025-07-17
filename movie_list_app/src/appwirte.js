import { Client, Databases, ID, Query } from 'appwrite'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject(PROJECT_ID); // Your Appwrite project ID  

  const database = new Databases(client);

export const updateSearchCount= async (searchTerm, movie) => {
    //1.Use Appwrite SDK to check if the search term already exists in the database
    try{
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);
        if(response.documents.length > 0) { 
            const doc = response.documents[0];
            // If it exists, increment the count
            const updatedCount = doc.count + 1;
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: updatedCount,
            });
        } else {
            // If it doesn't exist, create a new document with count 1
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`,// Store the movie details if needed
        });
    }

    } catch (error) {
        console.error('Error updating search count:', error);
    }
    //2.If it exists, increment the count
    //3.If it doesn't exist, create a new document with count 1

}

export const getTrendingMovies = async () => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('count'),
            Query.limit(5) // Adjust the limit as needed
        ])
        return result.documents;

    } catch (error) {
        console.error('Error fetching trending movies:', error);
    }
    // Implement the logic to fetch trending movies from the API
}
