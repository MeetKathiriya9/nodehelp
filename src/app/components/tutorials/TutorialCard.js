import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Link from "next/link";
import { useTheme } from "next-themes";

export function TutorialCard({ tutorial }) {  

  const { resolvedTheme } = useTheme();


  return (
    <Link href={`/code-library/${tutorial._id}`}>
      <Card className={`h-full hover:shadow-lg transition-shadow border ${resolvedTheme == "dark" ? "border-gray-600" : ""} `}>
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{tutorial.difficulty}</Badge>
          </div>
          <CardTitle className="mb-2">{tutorial.title}</CardTitle>
          <CardDescription className=" line-clamp-1">{tutorial.description}</CardDescription>
          <div className="mt-4">
            <Badge variant="outline" className={`${resolvedTheme == "dark" ? "border-gray-600" : ""}`}>{tutorial.category}</Badge>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
