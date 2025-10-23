export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Project Detail</h1>
      <p className="text-muted-foreground mt-2">
        Project ID: {params.id}
      </p>
      <p className="text-muted-foreground">
        Project detail view will be implemented in Story 5.2
      </p>
    </div>
  );
}
