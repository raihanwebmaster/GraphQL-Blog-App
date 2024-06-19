import React, { useEffect, useState } from 'react';
import './PostCard.css'
import { UserCircleIcon } from '@heroicons/react/24/solid'

const PostCard = ({ post }) => {

    const [formatedDate, setFormatedDate] = useState("");
    useEffect(() => {
        if (post.createdAt) {
            const dateInstance = new Date(Number(post.createdAt)); // Ensure the timestamp is a number
            setFormatedDate(`${dateInstance.getDate()}-${dateInstance.getMonth() + 1}-${dateInstance.getFullYear()}`);
        }
    }, [post]);

    return (
        <article className="flex max-w-xl flex-col items-start justify-between border w-96 m-4 p-4 rounded-md border-black-400">
            <div className="flex items-center gap-x-4 text-xs">
                <h2 className="text-gray-500">
                    {formatedDate}
                </h2>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post?.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                    </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post?.content}</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
                <UserCircleIcon className="w-8 h-8" />
                <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                        <a href={post?.author?.href}>
                            <span className="absolute inset-0" />
                            {post?.author?.name}
                        </a>
                    </p>
                </div>
            </div>
        </article>

    );
};

export default PostCard;