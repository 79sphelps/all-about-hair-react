# Overview – Small Business Site: All About Hair

This is a **React.js** application built for a local hair salon business in Happy Valley, OR.

The app leverages:
- **TanStack Query (React Query)** for fetching, caching, synchronizing, and updating server state
- **react-bootstrap** for UI components and responsive layouts
- Secure APIs supporting authorized CRUD operations
- **OAuth-based authentication and access management**
- **react-hook-form** for simple and complex forms with custom validation

**All About Hair** is a full-stack web application designed to manage both a public-facing website and internal salon content through a secure admin interface.

---

## Who This Is For

- Salon owners and staff managing site content
- Customers viewing services, hours, and contact information

---

## Problem It Solves

The business needed a custom website that:

- Allows non-technical users to update content
- Secures administrative access
- Integrates scheduling tools
- Avoids ongoing CMS or platform subscription costs

---

## Architecture & Technical Decisions

- **MERN stack (React.js + Node.js/Express + MongoDB)** for a single-language JavaScript ecosystem
- **JWT-based OAuth authentication** with automatic token renewal for secure admin access
- **RESTful APIs** supporting full CRUD operations for site content
- **Bootstrap** for responsive layouts and rapid UI development
- **Google Calendar API integration** to surface scheduling data
- **MongoDB Atlas** for cloud-hosted document storage