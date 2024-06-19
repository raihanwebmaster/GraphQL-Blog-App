import React from 'react';
import PostCard from './PostCard';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
        query PostData {
            posts {
            title
            content
            createdAt
            author {
                name
            }
            }
        }
`

const Posts = () => {

    const { loading, error, data } = useQuery(GET_POSTS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className="bg-white py-24 sm:py-32 h-screen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {
                        data.posts.length > 0 ? data.posts.map((post, index) => (
                            <PostCard key={index} post={post} />
                        )) : <p>No post available</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Posts;