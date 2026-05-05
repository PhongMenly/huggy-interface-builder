import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ADMIN_EMAIL = "phuongvimmo25@gmail.com";

interface LevelVideo {
  id: string;
  level_number: number;
  video_url: string;
  title: string;
  created_at: string;
}

function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
  );
  return match ? match[1] : null;
}

function VideoCard({ video, isAdmin, onDelete }: { video: LevelVideo; isAdmin: boolean; onDelete: (id: string) => void }) {
  const [playing, setPlaying] = useState(false);
  const ytId = extractYoutubeId(video.video_url);
  const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      {video.title && (
        <div className="px-3 py-2 text-sm font-medium text-foreground">{video.title}</div>
      )}
      <div className="relative pb-[56.25%]">
        {playing && ytId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
            title={video.title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : thumbnail ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black"
          >
            <img src={thumbnail} alt={video.title} className="h-full w-full object-cover opacity-80" />
            <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 ml-1"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 underline">
              Xem video
            </a>
          </div>
        )}
      </div>
      {isAdmin && (
        <button
          onClick={() => onDelete(video.id)}
          className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-600/80 text-xs text-white hover:bg-red-700"
        >
          ✕
        </button>
      )}
    </div>
  );
}

interface LevelVideosProps {
  levelNumber: number;
}

export function LevelVideos({ levelNumber }: LevelVideosProps) {
  const { user } = useAuth();
  const isAdmin = user?.email === ADMIN_EMAIL;
  const [videos, setVideos] = useState<LevelVideo[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchVideos = useCallback(async () => {
    const { data } = await supabase
      .from("level_videos")
      .select("*")
      .eq("level_number", levelNumber)
      .order("created_at", { ascending: true });
    if (data) setVideos(data as LevelVideo[]);
  }, [levelNumber]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleAdd = async () => {
    if (!newUrl.trim()) return;
    setSubmitting(true);
    await supabase.from("level_videos").insert({
      level_number: levelNumber,
      video_url: newUrl.trim(),
      title: newTitle.trim(),
    });
    setNewUrl("");
    setNewTitle("");
    setShowAdd(false);
    setSubmitting(false);
    fetchVideos();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("level_videos").delete().eq("id", id);
    fetchVideos();
  };

  if (videos.length === 0 && !isAdmin) return null;

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Video hướng dẫn Level {levelNumber}</h3>
        {isAdmin && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-white hover:scale-110 transition-transform"
            style={{ backgroundColor: "#a020f0" }}
          >
            +
          </button>
        )}
      </div>

      {videos.length === 0 && isAdmin && (
        <p className="text-sm text-muted-foreground">Chưa có video nào. Nhấn + để thêm video hướng dẫn.</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} isAdmin={isAdmin} onDelete={handleDelete} />
        ))}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-[#1e1e1e] border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Thêm video Level {levelNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Tiêu đề video</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="VD: Hướng dẫn quy trình sale cơ bản"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Link video (YouTube)</label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={submitting || !newUrl.trim()}
              className="w-full"
              style={{ backgroundColor: "#ffd700", color: "#121212" }}
            >
              {submitting ? "Đang lưu..." : "Lưu video"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}