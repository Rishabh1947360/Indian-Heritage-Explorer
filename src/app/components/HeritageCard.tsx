import React from 'react';

interface HeritageCardProps {
  title: string;
  image: string;
  onClick?: () => void;
  description?: string;
  icon?: React.ReactNode;
}

export function HeritageCard({ title, image, onClick, description, icon }: HeritageCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        {icon && <div className="mb-2 text-[#FF9933]">{icon}</div>}
        <h3 className="mb-2 text-gray-800">{title}</h3>
        {description && <p className="text-sm text-gray-600 line-clamp-2">{description}</p>}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF9933]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
