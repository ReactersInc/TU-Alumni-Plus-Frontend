import { useState } from "react";
import { Card, CardContent } from "@/components/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
} from "@/components/FormFields";

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const years = ["2024", "2023", "2022", "2021", "2020"];

  const galleryImages = [
    {
      id: 1,
      src: "/gallery/1.jpg",
      title: "Annual Alumni Reunion 2024",
      year: "2024",
      event: "Reunion",
      description: "Reconnecting with classmates after years",
      album: [
        "/gallery/reunion/1.jpg",
        "/gallery/reunion/2.jpg",
        "/gallery/reunion/3.jpg",
      ],
    },
    {
      id: 2,
      src: "/gallery/2.jpg",
      title: "Mentorship Program Launch",
      year: "2024",
      event: "Mentorship",
      description: "Alumni mentoring current students",
      album: ["/gallery/mentorship/1.jpg", "/gallery/mentorship/2.jpg"],
    },
    {
      id: 3,
      src: "/gallery/3.jpg",
      title: "Distinguished Alumni Awards 2023",
      year: "2023",
      event: "Awards",
      description: "Celebrating outstanding achievements",
      album: [
        "/gallery/awards/1.jpg",
        "/gallery/awards/2.jpg",
        "/gallery/awards/3.jpg",
      ],
    },
    {
      id: 4,
      src: "/gallery/6.jpg",
      title: "Global Alumni Meet 2022",
      year: "2022",
      event: "Reunion",
      description: "International alumni gathering",
      album: [
       "/gallery/awards/1.jpg",
        "/gallery/awards/2.jpg",
        "/gallery/awards/3.jpg",
      ],
    },
  ];

  const filteredImages =
    selectedYear === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.year === selectedYear);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Alumni Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Relive the memorable moments from our alumni events and celebrations
          </p>

          {/* Year Filter */}
          <div className="flex justify-center">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-48 bg-white shadow-md">
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              onClick={() => setSelectedEvent(image)}
              className="cursor-pointer group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-navy text-white">
                    {image.year}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-navy border-navy">
                    {image.event}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {image.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {image.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No images found for the selected year.
            </p>
          </div>
        )}
      </div>

      {/* Modal for event album */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 p-8 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-3xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-center text-navy mb-4">
              {selectedEvent.title}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {selectedEvent.description}
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedEvent.album.map((photo: string, idx: number) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${selectedEvent.title} ${idx + 1}`}
                  className="w-full h-60 object-cover rounded-xl shadow hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
