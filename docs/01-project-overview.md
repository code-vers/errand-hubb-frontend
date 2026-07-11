# Project Overview

## Table of Contents
1. [Introduction](#introduction)
2. [Business Goal](#business-goal)
3. [Main Users & Roles](#main-users--roles)
4. [Overall Workflow](#overall-workflow)

---

## Introduction

**Errand Hubb** is a comprehensive full-stack platform designed to bridge the gap between individuals or businesses needing tasks done (Clients) and individuals looking to earn money by completing tasks (ErrandRs or Service Providers). 

The platform supports a gig-economy model similar to TaskRabbit or Upwork but tailored specifically for local or remote errands and service requests, complete with real-time communication, a tiered subscription model, and an advertising system.

## Business Goal

The primary business goal of Errand Hubb is to:
- **Facilitate Connections:** Create a seamless, trusted environment where clients can post errands (jobs) or request specific services, and skilled errand runners can apply and fulfill them.
- **Monetize through Subscriptions & Ads:** Generate revenue by offering premium subscriptions to ErrandRs (which might provide better visibility or reduced fees) and allowing businesses to place advertisements on the platform via an Ads Subscription.
- **Ensure Safety and Reliability:** Provide secure authentication, role-based access, transparent communication, and integrated payment histories.

## Main Users & Roles

The platform relies on a strict Role-Based Access Control (RBAC) system. The three primary user roles are:

### 1. Client (`client`)
- **Purpose:** Users who need tasks completed.
- **Capabilities:**
  - Can create and manage "Posts" (errands).
  - Can create "Service Requests" targeting specific categories.
  - Can initiate and participate in real-time conversations with ErrandRs.
  - Leave ratings and feedback.

### 2. ErrandR / Service Provider (`errand`)
- **Purpose:** Users who complete tasks to earn money.
- **Capabilities:**
  - Can browse available posts/errands.
  - Can apply to or accept errands.
  - Can subscribe to premium plans via Stripe to enhance their profile.
  - Maintain a public profile showcasing their skills, location, hourly rates, and portfolio (gallery/YouTube links).

### 3. Admin (`admin`)
- **Purpose:** Platform administrators ensuring smooth operations.
- **Capabilities:**
  - Manage users, resolve disputes, and oversee the platform.
  - Manage ad categories, subcategories, and approve/reject advertisements.
  - Monitor system health, payments, and subscriptions.

## Overall Workflow

The typical lifecycle of a transaction on Errand Hubb involves the following steps:

1. **Registration & Onboarding:**
   - A Client or ErrandR registers for an account.
   - The user verifies their email and completes their profile setup.
   
2. **Posting a Job:**
   - A Client logs in and creates a new **Post** (errand), specifying the category, budget, location, and urgency.
   
3. **Application & Acceptance:**
   - ErrandRs browse posts and express interest (via applications or direct messaging).
   - The Client reviews ErrandR profiles and selects the best fit.

4. **Real-time Communication:**
   - The Client and the ErrandR use the built-in real-time **Conversation/Message** system to discuss details, negotiate rates, or coordinate the task.

5. **Task Completion:**
   - The ErrandR completes the requested task.
   - The post status is updated to `completed`.

6. **Feedback & History:**
   - (Future integration) Ratings and reviews are exchanged.
   - The job is permanently recorded in both the Client's and the ErrandR's history.

7. **Monetization Workflows (Parallel):**
   - **ErrandRs** can upgrade their accounts via the Stripe-powered `Subscription` module.
   - **Businesses/Advertisers** can purchase an `AdsSubscription` and post approved Advertisements (`Ad` module) to the platform to reach the user base.
