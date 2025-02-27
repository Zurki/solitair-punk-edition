import React from 'react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import PunkSolitaire from '../components/solitaire/PunkSolitaire';

// Add specific styles for the solitaire route
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display&display=swap",
  }
];

export const meta: MetaFunction = () => {
  return [
    { title: "PUNK SOLITAIRE" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" }
  ];
};

export default function Solitaire() {
  return (
    <div className="w-screen h-screen overflow-hidden m-0 p-0">
      <PunkSolitaire />
    </div>
  );
} 