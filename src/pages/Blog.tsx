import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Textarea } from "@/components/FormFields";
import { Calendar, User, ArrowRight, Plus, Edit, Flag } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
    excerpt: "",
  });

  // Report modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [reportForm, setReportForm] = useState({
    name: "",
    email: "",
    reason: "",
  });
  const [reportMessage, setReportMessage] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setLoggedInUser(data.user);
        setNewPost((prev) => ({
          ...prev,
          author: `${data.user.firstName} ${data.user.lastName}`,
        }));
        setReportForm((prev) => ({
          ...prev,
          name: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  // Fetch all blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blog");
        const data = await res.json();
        const formatted = (data.posts || []).map((post) => ({
          ...post,
          date: post.createdAt
            ? new Date(post.createdAt).toDateString()
            : "Unknown date",
          readTime: "5 min read",
        }));
        setBlogPosts(formatted);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // Create new blog post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessageType("error");
      setMessage("You must be logged in to submit a blog post.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message || "Failed to submit blog post");
        return;
      }

      setMessageType("success");
      setMessage("Blog post shared successfully!");
      setNewPost({
        title: "",
        content: "",
        author: loggedInUser?.name || "",
        excerpt: "",
      });
      setIsWriting(false);

      setBlogPosts((prev) => [
        {
          ...newPost,
          id: data.postId,
          date: new Date().toDateString(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  // Handle report submission
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPostId) return;

    setReportLoading(true);
    setReportMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: selectedPostId,
          ...reportForm,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setReportMessage(data.message || "Failed to submit report.");
        return;
      }

      setReportMessage("Report submitted successfully!");
      setReportForm({ name: reportForm.name, email: reportForm.email, reason: "" });

      setTimeout(() => {
        setShowReportModal(false);
        setReportMessage("");
      }, 1500);
    } catch (err) {
      console.error(err);
      setReportMessage("Error submitting report.");
    } finally {
      setReportLoading(false);
    }
  };

  const openReportModal = (postId: string) => {
    setSelectedPostId(postId);
    setShowReportModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Alumni Blogs and Posts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Read inspiring stories and updates from our alumni community.
          </p>
          <Button
            onClick={() => setIsWriting(!isWriting)}
            variant="hero"
            size="lg"
            className="mb-8"
          >
            <Edit className="mr-2 h-5 w-5" />
            {isWriting ? "Cancel" : "Write Your Story"}
          </Button>
        </div>

        {/* Write Blog Form */}
        {isWriting && (
          <Card className="mb-12 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-navy">Share Your Story</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={newPost.author}
                    onChange={(e) =>
                      setNewPost({ ...newPost, author: e.target.value })
                    }
                    readOnly={!!loggedInUser}
                    required
                  />
                  <Input
                    placeholder="Story Title"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    required
                  />
                </div>
                <Textarea
                  placeholder="Brief excerpt/summary of your story..."
                  value={newPost.excerpt}
                  onChange={(e) =>
                    setNewPost({ ...newPost, excerpt: e.target.value })
                  }
                  className="min-h-20"
                  required
                />
                <Textarea
                  placeholder="Write your full story here..."
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  className="min-h-40"
                  required
                />

                {message && (
                  <p
                    className={`text-center mt-2 ${
                      messageType === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <div className="flex gap-4">
                  <Button type="submit" variant="hero" disabled={loading}>
                    <Plus className="mr-2 h-4 w-4" />
                    {loading ? "Publishing..." : "Publish Story"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsWriting(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Featured Post */}
        {blogPosts[0] && (
          <Card className="mb-12 p-8 border-l-4 border-navy bg-white/70 backdrop-blur-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              {blogPosts[0].title}
            </h2>
            <p className="text-muted-foreground mb-4">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {blogPosts[0].author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {blogPosts[0].date}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="hero" asChild>
                <Link to={`/blog/${blogPosts[0].id}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" onClick={() => openReportModal(blogPosts[0].id)}>
                <Flag className="mr-2 h-4 w-4 text-red-500" /> Report
              </Button>
            </div>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg text-navy group-hover:text-navy-light transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-navy hover:text-navy-light"
                    asChild
                  >
                    <Link to={`/blog/${post.id}`}>
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openReportModal(post.id)}
                  >
                    <Flag className="mr-1 h-3 w-3" /> Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold text-navy mb-4">
              Report this Blog
            </h2>
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={reportForm.name}
                onChange={(e) =>
                  setReportForm({ ...reportForm, name: e.target.value })
                }
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={reportForm.email}
                onChange={(e) =>
                  setReportForm({ ...reportForm, email: e.target.value })
                }
                required
              />
              <Textarea
                placeholder="Reason for reporting..."
                value={reportForm.reason}
                onChange={(e) =>
                  setReportForm({ ...reportForm, reason: e.target.value })
                }
                required
              />
              {reportMessage && (
                <p
                  className={`text-sm ${
                    reportMessage.includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {reportMessage}
                </p>
              )}
              <div className="flex gap-3">
                <Button type="submit" variant="hero" disabled={reportLoading}>
                  {reportLoading ? "Submitting..." : "Submit Report"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
