import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Link from "next/link";

// Assuming the Tutorial type is defined as a JavaScript object in the data file
// or imported as a regular JavaScript object instead of a TypeScript type.

export function TutorialCard({ tutorial }) {
  return (
    <Link href={`/tutorials/${tutorial._id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{tutorial.difficulty}</Badge>
          </div>
          <CardTitle className="mb-2">{tutorial.title}</CardTitle>
          <CardDescription className=" line-clamp-1">{tutorial.description}</CardDescription>
          <div className="mt-4">
            <Badge variant="outline">{tutorial.category}</Badge>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
