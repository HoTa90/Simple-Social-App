# Simple Social App

A modern social media application built with Next.js where users can create posts, upload images, follow/unfollow others, and interact with content through likes, comments, and notifications. Authentication is powered by **Clerk**, while **Prisma** handles database access. The UI is styled with **Tailwind CSS**, **shadcn/ui components**, and **Lucide React icons**.

## Live Preview

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open-green?style=for-the-badge)](https://simple-social-app-roan.vercel.app/)

## Project Overview

This project includes:
- Public and private routes
- User authentication & management (Clerk)
- Create, like, and comment on posts
- Follow/unfollow functionality
- Notifications for user interactions
- User profile page with stats and posts and liked content
- Image uploads with UploadThing

## Technologies Used

- **Frontend/Fullstack:**
  - Next.js
  - Clerk (Authentication)
  - Prisma (ORM)
  - Tailwind CSS
  - shadcn/ui (component library)
  - UploadThing (file uploads)
  - Lucide React (icons)
  - react-hot-toast (notifications)

[![Next.js](https://img.shields.io/badge/Next.js-✓-black)]() 
[![Clerk](https://img.shields.io/badge/Clerk-✓-blueviolet)]() 
[![Prisma](https://img.shields.io/badge/Prisma-✓-2D3748)]() 
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-✓-38B2AC)]() 
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-✓-indigo)]() 
[![UploadThing](https://img.shields.io/badge/UploadThing-✓-orange)]() 
[![Lucide](https://img.shields.io/badge/Lucide_Icons-✓-yellowgreen)]()

## Public Part (Unauthenticated Access)
- **Login/Register:** Authentication handled by Clerk  
- **Home Feed:** Browse posts

## Private Part (User Area) 
- **Post Creation:** Text + image uploads
- **Interactions:** Like/unlike and comment on posts or delete if owner  
- **User Profiles:** View all posts and liked posts of any user, follow/unfollow, edit your own  
- **Follow System:** Follow/unfollow other users  
- **Notifications Page:** View activity (likes, comments, follows)
