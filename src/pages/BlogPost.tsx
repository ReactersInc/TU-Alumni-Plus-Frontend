import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/Card";
import { Calendar, User } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blog/${id}`);
        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Card className="p-8">
          <CardTitle className="text-3xl mb-4">{post.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" /> {post.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {new Date(post.createdAt).toDateString()}
            </div>
          </div>
          <CardContent>
            <p className="whitespace-pre-line">{post.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;
