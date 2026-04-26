import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Upload, Trash2, Edit2, Loader2, Image, FileText } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload form state
  const [uploadForm, setUploadForm] = useState({
    description: "",
    category: "photos",
  });

  // Query to list files
  const { data: files, isLoading, refetch } = trpc.files.list.useQuery(
    selectedCategory !== "all" ? { category: selectedCategory } : undefined
  );

  // Mutations
  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      toast.success("File uploaded successfully!");
      setUploadForm({ description: "", category: "photos" });
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload file");
    },
  });

  const deleteMutation = trpc.files.delete.useMutation({
    onSuccess: () => {
      toast.success("File deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete file");
    },
  });

  // Handle file selection and upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileData = event.target?.result as string;
        const base64Data = fileData.split(",")[1] || fileData;

        await uploadMutation.mutateAsync({
          filename: file.name,
          fileData: base64Data,
          mimeType: file.type,
          fileSize: file.size,
          category: uploadForm.category,
          description: uploadForm.description,
        });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[oklch(0.88_0.08_162)] to-[oklch(0.88_0.08_290)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need admin privileges to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = "/"} className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.99_0.008_80)] to-[oklch(0.97_0.015_162)] py-12">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-4xl text-[oklch(0.25_0.05_60)] mb-2">
            Admin Dashboard
          </h1>
          <p className="font-body text-[oklch(0.45_0.04_60)]">
            Manage nursery photos and documents
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload size={20} />
                  Upload File
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="font-body font-semibold text-sm text-[oklch(0.30_0.06_60)] mb-2 block">
                    Category
                  </label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[oklch(0.88_0.08_162)] font-body text-sm"
                  >
                    <option value="photos">Photos</option>
                    <option value="activities">Activities</option>
                    <option value="classroom">Classroom</option>
                    <option value="events">Events</option>
                    <option value="documents">Documents</option>
                  </select>
                </div>

                <div>
                  <label className="font-body font-semibold text-sm text-[oklch(0.30_0.06_60)] mb-2 block">
                    Description
                  </label>
                  <Textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Add a description for this file..."
                    className="font-body text-sm"
                    rows={3}
                  />
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading || uploadMutation.isPending}
                    className="w-full bg-[oklch(0.62_0.14_162)] hover:bg-[oklch(0.55_0.16_162)]"
                  >
                    {uploading || uploadMutation.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={16} className="mr-2" />
                        Choose File
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Files List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Files</CardTitle>
                <CardDescription>
                  Total files: {files?.length || 0}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Category Filter */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                    size="sm"
                  >
                    All
                  </Button>
                  {["photos", "activities", "classroom", "events", "documents"].map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      onClick={() => setSelectedCategory(cat)}
                      size="sm"
                      className="capitalize"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                {/* Files Grid */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={32} className="animate-spin text-[oklch(0.62_0.14_162)]" />
                  </div>
                ) : files && files.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="border border-[oklch(0.88_0.08_162)] rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        {/* File Preview */}
                        <div className="mb-3 h-32 bg-[oklch(0.97_0.015_162)] rounded-lg flex items-center justify-center overflow-hidden">
                          {file.mimeType.startsWith("image") ? (
                            <img
                              src={file.fileUrl}
                              alt={file.filename}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileText size={48} className="text-[oklch(0.62_0.14_162)]" />
                          )}
                        </div>

                        {/* File Info */}
                        <div className="mb-3">
                          <h4 className="font-display font-bold text-sm text-[oklch(0.25_0.05_60)] truncate mb-1">
                            {file.filename}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block px-2 py-1 rounded-full bg-[oklch(0.88_0.08_162)] text-[oklch(0.35_0.12_162)] font-body text-xs font-semibold capitalize">
                              {file.category}
                            </span>
                            <span className="font-body text-xs text-[oklch(0.55_0.04_60)]">
                              {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          {file.description && (
                            <p className="font-body text-xs text-[oklch(0.45_0.04_60)] line-clamp-2">
                              {file.description}
                            </p>
                          )}
                          <p className="font-body text-xs text-[oklch(0.55_0.04_60)] mt-2">
                            {new Date(file.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => window.open(file.fileUrl, "_blank")}
                          >
                            <Image size={14} className="mr-1" />
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => deleteMutation.mutate({ fileId: file.id })}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 size={14} className="mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Upload size={48} className="mx-auto mb-4 text-[oklch(0.62_0.14_162)]/30" />
                    <p className="font-body text-[oklch(0.45_0.04_60)]">
                      No files uploaded yet. Start by uploading your first file!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
