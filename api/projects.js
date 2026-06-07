const projects = [
  {
    id: 1,
    title: "Agri Doctor",
    description: "AI Plant Disease Detection System",
  },
  {
    id: 2,
    title: "Vehicle Information Management System",
    description: "Cab and Service Management Platform",
  },
  {
    id: 3,
    title: "Limited Battery System",
    description: "Rechargeable Battery Solution",
  },
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    res.status(200).json(projects);
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
}
