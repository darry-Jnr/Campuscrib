import type { Metadata } from "next";
import Card from "../components/cards/Card";
import Container from "../components/Container";

export const metadata: Metadata = {
  title: "Campus Crib – Find Student Accommodation Easily",
  description:
    "Find verified off-campus housing for students in FUTA and other Nigerian universities. Browse available houses and connect with trusted agents.",
};

export default function Home() {
  return (
    <Container>
      <div className="pt-28 pb-11">
        <Card />
      </div>
    </Container>
  );
}
