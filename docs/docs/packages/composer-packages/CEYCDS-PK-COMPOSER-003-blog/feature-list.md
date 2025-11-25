# MVP Feature Checklist

This document verifies which MVP features are implemented in the `ceygenic/blog-core` package.

##  Implemented Features

### 1. Dual Storage System 


-  Database (MySQL/PostgreSQL) driver via Eloquent
-  Sanity CMS driver for headless CMS
-  Switch via config file (`BLOG_DRIVER` environment variable)
-  Repository pattern with interfaces for both drivers
-  Configuration in `config/blog.php`



---

### 2. RESTful API 


#### Public Endpoints 
-  `GET /api/blog/posts` - List all posts (paginated)
-  `GET /api/blog/posts/{slug}` - Get single post
-  `GET /api/blog/categories` - List all categories
-  `GET /api/blog/categories/{slug}/posts` - Get posts by category
-  `GET /api/blog/tags` - List all tags
-  `GET /api/blog/tags/{slug}/posts` - Get posts by tag
-  `GET /api/blog/authors/{id}` - Get author with posts
-  `GET /api/blog/authors/{id}/posts` - Get posts by author
-  `GET /api/blog/posts/search?q={query}` - Search posts
-  `GET /api/blog/tags/popular` - Popular tags

#### Admin Endpoints 
-  `GET /api/blog/admin/posts` - List all posts
-  `POST /api/blog/admin/posts` - Create post
-  `GET /api/blog/admin/posts/{id}` - Get post
-  `PUT/PATCH /api/blog/admin/posts/{id}` - Update post
-  `DELETE /api/blog/admin/posts/{id}` - Delete post
-  `POST /api/blog/admin/posts/{id}/publish` - Publish post
-  `POST /api/blog/admin/posts/{id}/unpublish` - Unpublish post
-  `POST /api/blog/admin/posts/{id}/toggle-status` - Toggle status
-  `POST /api/blog/admin/posts/{id}/schedule` - Schedule post
-  `POST /api/blog/admin/posts/{id}/duplicate` - Duplicate post
-  `POST /api/blog/admin/posts/{id}/archive` - Archive post
-  `POST /api/blog/admin/posts/{id}/restore` - Restore post
-  `GET /api/blog/admin/categories` - List categories
-  `POST /api/blog/admin/categories` - Create category
-  `GET /api/blog/admin/categories/{id}` - Get category
-  `PUT/PATCH /api/blog/admin/categories/{id}` - Update category
-  `DELETE /api/blog/admin/categories/{id}` - Delete category
-  `POST /api/blog/admin/media/upload` - Upload media
-  `GET /api/blog/admin/media` - List media
-  `GET /api/blog/admin/media/{id}` - Get media
-  `PUT/PATCH /api/blog/admin/media/{id}` - Update media

#### API Features 
-  JSON:API compliant responses (via Resources)
-  Filterable & sortable (using `spatie/laravel-query-builder`)
-  Basic pagination (configurable per_page)
-  Rate limiting (120 req/min public, 60 req/min admin)
-  API token authentication (Laravel Sanctum for admin endpoints)



---

### 3. Post Management 



#### Post Fields 
-  Title
-  Content
-  Excerpt
-  Featured Image
-  Status (Draft/Published/Archived)
-  Published At
-  Author (single user via `author_id`)
-  Categories (multiple via `category_id`)
-  Tags (multiple via pivot table)
-  Reading Time (auto-calculated)

#### Post Features 
-  Create/Edit/Delete
-  Draft saving (`status: 'draft'`)
-  Post scheduling (`published_at` future date)
-  Status toggle (publish/unpublish)
-  Archive/Restore functionality


---

### 4. Category System 



-  Flat structure (no hierarchy)
-  Category name & slug (auto-generated)
-  Category description
-  Post count (automatic via `getPostCountAttribute()`)
-  Order control (`order` field with `moveUp()`, `moveDown()`, `setOrder()` methods)


---

### 5. Tag System 



-  Free-form tagging
-  Tag auto-complete (via search/filter in API)
-  Popular tags widget (`GET /api/blog/tags/popular`)
-  Tag count (automatic via `getPostCountAttribute()`)



---

### 6. Author Management 


-  Linked to Laravel User model (configurable)
-  Author bio (via `AuthorProfile` model)
-  Author avatar (via `AuthorProfile` model)
-  Social links (optional, stored as JSON)
-  Single author per post (via `author_id` foreign key)
-  Author page (list author posts via `GET /api/blog/authors/{id}/posts`)

---

### 7. Media Library 


#### Image Management 
-  Upload (via `POST /api/blog/admin/media/upload`)
-  Alt text (`alt_text` field)
-  Captions (`caption` field)

#### Storage Options 
-  Local storage (default)
-  Amazon S3 (via `BLOG_MEDIA_DISK` config)
-  Cloudinary (via `BLOG_MEDIA_DISK` config)
-  Configurable via `config/blog.php` → `media.disk`


---

### 8. Search & Filtering 


#### Search 
-  Full-text search (title + content + excerpt)
-  Basic relevance sorting (title matches prioritized)

#### Filtering 
-  By category (`filter[category_id]` or `?category_id=`)
-  By tag (`filter[tag_id]` or `?tag_id=`)
-  By author (`filter[author_id]` or `?author_id=`)
-  By date range (`?start_date=` and `?end_date=`)
-  By status (`filter[status]` - admin only for draft/archived)



---


### 10. Performance 

**Status:** Fully Implemented

-  Query optimization (eager loading via `load()` in repositories)
-  Database indexing (migrations include indexes on `status`, `published_at`, `category_id`, `author_id`)
-  Basic caching (config-based via `HasCache` trait)
- Image lazy loading (not implemented - would be frontend concern)

**Files:**
- `database/migrations/` - Index definitions
- `src/Traits/HasCache.php` - Caching trait
- `config/blog.php` - Cache configuration
- `src/Repositories/Eloquent/` - Eager loading in queries

---

### 11. Admin Interface 



**What IS provided:**
- ✅ All admin API endpoints ready for admin UI to consume
- ✅ Complete CRUD operations for posts, categories, tags, media
- ✅ Post management actions (publish, unpublish, schedule, duplicate, archive, restore)


