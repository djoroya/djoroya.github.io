import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import post from './post.json';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

export const PostDetail = () => {
  const { postId } = useParams();
  const selectedPost = post.find((p, index) => index === parseInt(postId, 10));

  if (!selectedPost) {
    return <h2>Post not found</h2>;
  }

  return (
    <div className="container font-monospace">
      <div className="card text-white m-5 p-3 rounded-3" style={{ backgroundColor: 'rgba(1, 1, 1, 0.5)' }}>
        <div className="card-title"><h1>{selectedPost.title}</h1></div>
        <div className="card-body">
          <ReactMarkdown
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[remarkMath]}
          >
            {selectedPost.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
