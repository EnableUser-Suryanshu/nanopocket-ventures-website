import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_ctas_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_tiles_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum_pages_blocks_hero_inline_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum_pages_blocks_hero_visual" AS ENUM('showcase', 'globe');
  CREATE TYPE "public"."enum_pages_blocks_hero_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_statement_lines_inline" AS ENUM('none', 'caption', 'arrow', 'button', 'mark');
  CREATE TYPE "public"."enum_pages_blocks_statement_tiles_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum_pages_blocks_statement_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_about_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum_pages_blocks_about_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_criteria_ctas_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_criteria_items_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum_pages_blocks_criteria_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_thesis_sectors_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum_pages_blocks_thesis_ctas_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_thesis_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_portfolio_ctas_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_portfolio_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_team_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_posts_source" AS ENUM('insights', 'press');
  CREATE TYPE "public"."enum_pages_blocks_posts_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_pitch_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_contact_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_tiles_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_inline_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_visual" AS ENUM('showcase', 'globe');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_lines_inline" AS ENUM('none', 'caption', 'arrow', 'button', 'mark');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_tiles_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_about_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum__pages_v_blocks_about_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_criteria_ctas_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_criteria_items_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum__pages_v_blocks_criteria_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_thesis_sectors_art" AS ENUM('logo3d', 'logoWhite', 'darkLogo', 'orbitRings', 'darkRings', 'spheres', 'darkSpheres', 'ribbon', 'coins', 'monolith', 'glassSeed', 'lattice', 'pills', 'orbit', 'globe', 'wave', 'radar', 'circuit', 'nodes', 'rings', 'terrain', 'shield', 'bars', 'helix', 'seed', 'bannerGlobe');
  CREATE TYPE "public"."enum__pages_v_blocks_thesis_ctas_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_thesis_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_portfolio_ctas_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_portfolio_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_team_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_source" AS ENUM('insights', 'press');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_pitch_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_theme" AS ENUM('white', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_insights_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__insights_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pitch_submissions_status" AS ENUM('new', 'reviewing', 'shortlisted', 'conversation', 'declined');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'replied', 'closed');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_enquiry_forms_forms_fields_type" AS ENUM('text', 'email', 'tel', 'url', 'textarea', 'select');
  CREATE TYPE "public"."enum_enquiry_forms_forms_fields_width" AS ENUM('full', 'half');
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"variant" "enum_pages_blocks_hero_ctas_variant" DEFAULT 'solid'
  );
  
  CREATE TABLE "pages_blocks_hero_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"meta" varchar,
  	"art" "enum_pages_blocks_hero_tiles_art" DEFAULT 'orbit',
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"lat" numeric,
  	"lng" numeric
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line_one" varchar DEFAULT 'Where Small Bets',
  	"highlight" varchar DEFAULT 'Discover',
  	"line_two" varchar DEFAULT 'India’s Big Tech.',
  	"inline_art" "enum_pages_blocks_hero_inline_art" DEFAULT 'seed',
  	"inline_image_id" integer,
  	"subline" varchar,
  	"scroll_label" varchar DEFAULT 'Scroll down',
  	"visual" "enum_pages_blocks_hero_visual" DEFAULT 'showcase',
  	"origin_label" varchar DEFAULT 'Mumbai',
  	"origin_lat" numeric DEFAULT 19.076,
  	"origin_lng" numeric DEFAULT 72.8777,
  	"anchor_id" varchar DEFAULT 'home',
  	"theme" "enum_pages_blocks_hero_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"before" varchar,
  	"inline" "enum_pages_blocks_statement_lines_inline" DEFAULT 'none',
  	"after" varchar
  );
  
  CREATE TABLE "pages_blocks_statement_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"meta" varchar,
  	"art" "enum_pages_blocks_statement_tiles_art" DEFAULT 'orbit',
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_new_tab" boolean,
  	"anchor_id" varchar DEFAULT 'statement',
  	"theme" "enum_pages_blocks_statement_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_about_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'About the fund',
  	"title" varchar DEFAULT 'Who We Are',
  	"tagline" varchar,
  	"art" "enum_pages_blocks_about_art" DEFAULT 'orbit',
  	"image_id" integer,
  	"image_caption" varchar,
  	"anchor_id" varchar DEFAULT 'who-we-are',
  	"theme" "enum_pages_blocks_about_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_criteria_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"variant" "enum_pages_blocks_criteria_ctas_variant" DEFAULT 'solid'
  );
  
  CREATE TABLE "pages_blocks_criteria_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"art" "enum_pages_blocks_criteria_items_art" DEFAULT 'seed',
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_criteria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Investment criteria',
  	"title" varchar DEFAULT 'What We Are Looking For',
  	"tagline" varchar DEFAULT 'Signals before consensus.',
  	"card_label" varchar DEFAULT 'We look for',
  	"anchor_id" varchar DEFAULT 'what-we-look-for',
  	"theme" "enum_pages_blocks_criteria_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_thesis_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_thesis_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "pages_blocks_thesis_sectors_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_thesis_sectors_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_thesis_sectors" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"category" varchar,
  	"summary" varchar,
  	"art" "enum_pages_blocks_thesis_sectors_art" DEFAULT 'orbit',
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_thesis_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"variant" "enum_pages_blocks_thesis_ctas_variant" DEFAULT 'solid'
  );
  
  CREATE TABLE "pages_blocks_thesis" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Investment thesis',
  	"title" varchar DEFAULT 'Where Are We Investing',
  	"tagline" varchar,
  	"intro" varchar,
  	"list_title" varchar DEFAULT 'Sectors',
  	"other_title" varchar DEFAULT 'Other high conviction themes',
  	"other_text_before" varchar,
  	"other_link_label" varchar,
  	"other_link_href" varchar,
  	"other_link_new_tab" boolean,
  	"other_text_after" varchar,
  	"open_label" varchar DEFAULT 'Read the thesis',
  	"close_label" varchar DEFAULT 'Close',
  	"pending_label" varchar DEFAULT 'Detailed note coming soon',
  	"anchor_id" varchar DEFAULT 'where-we-invest',
  	"theme" "enum_pages_blocks_thesis_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_number_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_number_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"variant" "enum_pages_blocks_portfolio_ctas_variant" DEFAULT 'solid'
  );
  
  CREATE TABLE "pages_blocks_portfolio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Portfolio',
  	"title" varchar DEFAULT 'Portfolio Highlights',
  	"tagline" varchar,
  	"show_key_numbers" boolean DEFAULT true,
  	"empty_value" varchar DEFAULT '—',
  	"show_companies" boolean DEFAULT true,
  	"companies_title" varchar DEFAULT 'Work With Our Portfolio',
  	"empty_note" varchar DEFAULT 'Select investments will be disclosed after internal approval.',
  	"visit_label" varchar DEFAULT 'Visit',
  	"anchor_id" varchar DEFAULT 'portfolio',
  	"theme" "enum_pages_blocks_portfolio_theme" DEFAULT 'light',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'People',
  	"title" varchar DEFAULT 'Team Responsible',
  	"tagline" varchar DEFAULT 'Founder First Focussed',
  	"linkedin_label" varchar DEFAULT 'LinkedIn',
  	"anchor_id" varchar DEFAULT 'team',
  	"theme" "enum_pages_blocks_team_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_posts_source" DEFAULT 'insights',
  	"eyebrow" varchar DEFAULT 'Insights',
  	"title" varchar DEFAULT 'Our Insights',
  	"tagline" varchar,
  	"limit" numeric DEFAULT 6,
  	"read_label" varchar DEFAULT 'Read',
  	"empty_title" varchar DEFAULT 'First notes arriving soon.',
  	"empty_body" varchar,
  	"empty_link_label" varchar,
  	"empty_link_href" varchar,
  	"empty_link_new_tab" boolean,
  	"anchor_id" varchar DEFAULT 'insights',
  	"theme" "enum_pages_blocks_posts_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pitch_note_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_pitch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Founders',
  	"title" varchar DEFAULT 'Pitch To Us',
  	"tagline" varchar DEFAULT 'Send one clear signal.',
  	"intro" varchar,
  	"note" varchar,
  	"anchor_id" varchar DEFAULT 'pitch-to-us',
  	"theme" "enum_pages_blocks_pitch_theme" DEFAULT 'dark',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_access_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Contact',
  	"title" varchar DEFAULT 'Reach Us',
  	"tagline" varchar DEFAULT 'The right path.',
  	"intro" varchar,
  	"access_title" varchar DEFAULT 'Quick access',
  	"anchor_id" varchar DEFAULT 'reach-us',
  	"theme" "enum_pages_blocks_contact_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor_id" varchar DEFAULT 'content',
  	"theme" "enum_pages_blocks_rich_text_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"variant" "enum__pages_v_blocks_hero_ctas_variant" DEFAULT 'solid',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"meta" varchar,
  	"art" "enum__pages_v_blocks_hero_tiles_art" DEFAULT 'orbit',
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line_one" varchar DEFAULT 'Where Small Bets',
  	"highlight" varchar DEFAULT 'Discover',
  	"line_two" varchar DEFAULT 'India’s Big Tech.',
  	"inline_art" "enum__pages_v_blocks_hero_inline_art" DEFAULT 'seed',
  	"inline_image_id" integer,
  	"subline" varchar,
  	"scroll_label" varchar DEFAULT 'Scroll down',
  	"visual" "enum__pages_v_blocks_hero_visual" DEFAULT 'showcase',
  	"origin_label" varchar DEFAULT 'Mumbai',
  	"origin_lat" numeric DEFAULT 19.076,
  	"origin_lng" numeric DEFAULT 72.8777,
  	"anchor_id" varchar DEFAULT 'home',
  	"theme" "enum__pages_v_blocks_hero_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"before" varchar,
  	"inline" "enum__pages_v_blocks_statement_lines_inline" DEFAULT 'none',
  	"after" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"meta" varchar,
  	"art" "enum__pages_v_blocks_statement_tiles_art" DEFAULT 'orbit',
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_new_tab" boolean,
  	"anchor_id" varchar DEFAULT 'statement',
  	"theme" "enum__pages_v_blocks_statement_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'About the fund',
  	"title" varchar DEFAULT 'Who We Are',
  	"tagline" varchar,
  	"art" "enum__pages_v_blocks_about_art" DEFAULT 'orbit',
  	"image_id" integer,
  	"image_caption" varchar,
  	"anchor_id" varchar DEFAULT 'who-we-are',
  	"theme" "enum__pages_v_blocks_about_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_criteria_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"variant" "enum__pages_v_blocks_criteria_ctas_variant" DEFAULT 'solid',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_criteria_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"art" "enum__pages_v_blocks_criteria_items_art" DEFAULT 'seed',
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_criteria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Investment criteria',
  	"title" varchar DEFAULT 'What We Are Looking For',
  	"tagline" varchar DEFAULT 'Signals before consensus.',
  	"card_label" varchar DEFAULT 'We look for',
  	"anchor_id" varchar DEFAULT 'what-we-look-for',
  	"theme" "enum__pages_v_blocks_criteria_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis_sectors_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis_sectors_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis_sectors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"category" varchar,
  	"summary" varchar,
  	"art" "enum__pages_v_blocks_thesis_sectors_art" DEFAULT 'orbit',
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"variant" "enum__pages_v_blocks_thesis_ctas_variant" DEFAULT 'solid',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Investment thesis',
  	"title" varchar DEFAULT 'Where Are We Investing',
  	"tagline" varchar,
  	"intro" varchar,
  	"list_title" varchar DEFAULT 'Sectors',
  	"other_title" varchar DEFAULT 'Other high conviction themes',
  	"other_text_before" varchar,
  	"other_link_label" varchar,
  	"other_link_href" varchar,
  	"other_link_new_tab" boolean,
  	"other_text_after" varchar,
  	"open_label" varchar DEFAULT 'Read the thesis',
  	"close_label" varchar DEFAULT 'Close',
  	"pending_label" varchar DEFAULT 'Detailed note coming soon',
  	"anchor_id" varchar DEFAULT 'where-we-invest',
  	"theme" "enum__pages_v_blocks_thesis_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_number_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_number_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"variant" "enum__pages_v_blocks_portfolio_ctas_variant" DEFAULT 'solid',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Portfolio',
  	"title" varchar DEFAULT 'Portfolio Highlights',
  	"tagline" varchar,
  	"show_key_numbers" boolean DEFAULT true,
  	"empty_value" varchar DEFAULT '—',
  	"show_companies" boolean DEFAULT true,
  	"companies_title" varchar DEFAULT 'Work With Our Portfolio',
  	"empty_note" varchar DEFAULT 'Select investments will be disclosed after internal approval.',
  	"visit_label" varchar DEFAULT 'Visit',
  	"anchor_id" varchar DEFAULT 'portfolio',
  	"theme" "enum__pages_v_blocks_portfolio_theme" DEFAULT 'light',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'People',
  	"title" varchar DEFAULT 'Team Responsible',
  	"tagline" varchar DEFAULT 'Founder First Focussed',
  	"linkedin_label" varchar DEFAULT 'LinkedIn',
  	"anchor_id" varchar DEFAULT 'team',
  	"theme" "enum__pages_v_blocks_team_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_posts_source" DEFAULT 'insights',
  	"eyebrow" varchar DEFAULT 'Insights',
  	"title" varchar DEFAULT 'Our Insights',
  	"tagline" varchar,
  	"limit" numeric DEFAULT 6,
  	"read_label" varchar DEFAULT 'Read',
  	"empty_title" varchar DEFAULT 'First notes arriving soon.',
  	"empty_body" varchar,
  	"empty_link_label" varchar,
  	"empty_link_href" varchar,
  	"empty_link_new_tab" boolean,
  	"anchor_id" varchar DEFAULT 'insights',
  	"theme" "enum__pages_v_blocks_posts_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pitch_note_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pitch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Founders',
  	"title" varchar DEFAULT 'Pitch To Us',
  	"tagline" varchar DEFAULT 'Send one clear signal.',
  	"intro" varchar,
  	"note" varchar,
  	"anchor_id" varchar DEFAULT 'pitch-to-us',
  	"theme" "enum__pages_v_blocks_pitch_theme" DEFAULT 'dark',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_access_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"new_tab" boolean,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Contact',
  	"title" varchar DEFAULT 'Reach Us',
  	"tagline" varchar DEFAULT 'The right path.',
  	"intro" varchar,
  	"access_title" varchar DEFAULT 'Quick access',
  	"anchor_id" varchar DEFAULT 'reach-us',
  	"theme" "enum__pages_v_blocks_contact_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor_id" varchar DEFAULT 'content',
  	"theme" "enum__pages_v_blocks_rich_text_theme" DEFAULT 'white',
  	"hidden" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"linkedin" varchar,
  	"order" numeric DEFAULT 10,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "insights" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"category" varchar,
  	"excerpt" varchar,
  	"cover_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_insights_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_insights_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_category" varchar,
  	"version_excerpt" varchar,
  	"version_cover_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__insights_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "press" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"outlet" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"url" varchar NOT NULL,
  	"excerpt" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio_companies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"published" boolean DEFAULT false,
  	"order" numeric DEFAULT 10,
  	"name" varchar NOT NULL,
  	"sector" varchar,
  	"stage" varchar,
  	"year" varchar,
  	"description" varchar,
  	"website" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_wide_url" varchar,
  	"sizes_wide_width" numeric,
  	"sizes_wide_height" numeric,
  	"sizes_wide_mime_type" varchar,
  	"sizes_wide_filesize" numeric,
  	"sizes_wide_filename" varchar
  );
  
  CREATE TABLE "pitch_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_pitch_submissions_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"startup_name" varchar NOT NULL,
  	"website" varchar,
  	"sector" varchar,
  	"stage" varchar,
  	"deck_id" integer,
  	"founder_names" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"vision" varchar,
  	"superiority" varchar,
  	"traction" varchar,
  	"willingness_to_pay" varchar,
  	"market" varchar,
  	"defensibility" varchar,
  	"build_plan" varchar,
  	"is_founder" varchar,
  	"read_thesis" varchar,
  	"dpiit" varchar,
  	"consent" boolean,
  	"user_agent" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enquiries_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_enquiries_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"type" varchar,
  	"name" varchar,
  	"email" varchar,
  	"user_agent" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pitch_decks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"startup_name" varchar,
  	"prefix" varchar DEFAULT 'pitch-decks',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"team_members_id" integer,
  	"insights_id" integer,
  	"press_id" integer,
  	"portfolio_companies_id" integer,
  	"media_id" integer,
  	"pitch_submissions_id" integer,
  	"enquiries_id" integer,
  	"pitch_decks_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'NanoPocket Ventures' NOT NULL,
  	"meta_title" varchar DEFAULT 'NanoPocket Ventures | India DeepTech and AI Venture Fund' NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"og_image_id" integer,
  	"investor_login_url" varchar DEFAULT 'https://app.ekwty.in/',
  	"invest_with_us_url" varchar DEFAULT 'https://nanopocketventures.decilehub.com/pacts?pid=6N0RoX8y',
  	"linkedin_url" varchar DEFAULT 'https://www.linkedin.com/company/nanopocket-ventures/',
  	"skip_to_content" varchar DEFAULT 'Skip to content',
  	"menu_label" varchar DEFAULT 'Menu',
  	"close_label" varchar DEFAULT 'Close',
  	"motion_on_label" varchar DEFAULT 'Pause motion',
  	"motion_off_label" varchar DEFAULT 'Play motion',
  	"back_to_top" varchar DEFAULT 'Back to top',
  	"opens_new_tab" varchar DEFAULT '(opens in a new tab)',
  	"view_label" varchar DEFAULT 'View',
  	"home_label" varchar DEFAULT 'NanoPocket Ventures — home',
  	"not_found_title" varchar DEFAULT 'This page is still a seed.',
  	"not_found_body" varchar DEFAULT 'The page you are looking for does not exist or has moved.',
  	"not_found_cta" varchar DEFAULT 'Return home',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean,
  	"show_on_mobile" boolean DEFAULT false
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"menu_eyebrow" varchar DEFAULT 'Navigate',
  	"menu_access_title" varchar DEFAULT 'Access',
  	"menu_note" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_fund_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "footer_navigate_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  CREATE TABLE "footer_access_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Investing early in NewGen Indian Start-ups & Founders that have the potential to become Big Tech',
  	"center_text" varchar DEFAULT 'Small Bets. Superior Solutions. Accelerated Customer Adoption. Impact at Scale.',
  	"show_buttons" boolean DEFAULT true,
  	"local_time_show" boolean DEFAULT true,
  	"local_time_label" varchar DEFAULT 'Mumbai, India',
  	"local_time_suffix" varchar DEFAULT 'IST',
  	"fund_heading" varchar DEFAULT 'Investor Relations',
  	"fund_subheading" varchar DEFAULT 'Fund Information',
  	"navigate_heading" varchar DEFAULT 'Navigate',
  	"access_heading" varchar DEFAULT 'Access',
  	"address_heading" varchar DEFAULT 'Registered Address',
  	"address_lines" varchar,
  	"address_map_label" varchar DEFAULT 'View on Google Maps',
  	"address_map_url" varchar,
  	"address_linkedin_label" varchar DEFAULT 'Follow on LinkedIn',
  	"copyright" varchar DEFAULT '© 2026 NanoPocket Ventures. All Rights Reserved.',
  	"disclaimer" varchar,
  	"show_wordmark" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pitch_form_thesis_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  CREATE TABLE "pitch_form_focus_sector_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pitch_form_focus_stage_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pitch_form" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"founder_enabled" boolean DEFAULT true,
  	"founder_title" varchar DEFAULT 'Who is applying' NOT NULL,
  	"founder_question" varchar DEFAULT 'Are you a Founder or Co-founder?',
  	"founder_yes" varchar DEFAULT 'Yes',
  	"founder_no" varchar DEFAULT 'No',
  	"founder_no_message" varchar,
  	"founder_no_link_label" varchar,
  	"founder_no_link_href" varchar,
  	"founder_no_link_new_tab" boolean,
  	"thesis_enabled" boolean DEFAULT true,
  	"thesis_title" varchar DEFAULT 'Our thesis' NOT NULL,
  	"thesis_question" varchar,
  	"thesis_yes" varchar DEFAULT 'Yes',
  	"thesis_no" varchar DEFAULT 'No',
  	"thesis_no_message" varchar,
  	"dpiit_title" varchar DEFAULT 'DPIIT recognition' NOT NULL,
  	"dpiit_question" varchar DEFAULT 'Is your Startup registered with DPIIT (erstwhile DIPP)?',
  	"dpiit_yes" varchar,
  	"dpiit_no" varchar,
  	"dpiit_applied" varchar,
  	"dpiit_planned" varchar,
  	"dpiit_no_message" varchar,
  	"startup_title" varchar DEFAULT 'Startup & founders' NOT NULL,
  	"startup_startup_name_label" varchar DEFAULT 'Startup’s name' NOT NULL,
  	"startup_startup_name_placeholder" varchar,
  	"startup_startup_name_required" boolean DEFAULT true,
  	"startup_startup_name_help" varchar,
  	"startup_website_label" varchar DEFAULT 'Startup’s website' NOT NULL,
  	"startup_website_placeholder" varchar DEFAULT 'https://',
  	"startup_website_required" boolean DEFAULT false,
  	"startup_website_help" varchar,
  	"startup_founder_names_label" varchar DEFAULT 'Founder & Co-founder’s name' NOT NULL,
  	"startup_founder_names_placeholder" varchar,
  	"startup_founder_names_required" boolean DEFAULT true,
  	"startup_founder_names_help" varchar,
  	"startup_email_label" varchar DEFAULT 'Founder or Co-founder’s e-mail' NOT NULL,
  	"startup_email_placeholder" varchar,
  	"startup_email_required" boolean DEFAULT true,
  	"startup_email_help" varchar,
  	"startup_phone_label" varchar DEFAULT 'Founder or Co-founder’s contact number' NOT NULL,
  	"startup_phone_placeholder" varchar,
  	"startup_phone_required" boolean DEFAULT false,
  	"startup_phone_help" varchar,
  	"focus_title" varchar DEFAULT 'Sector & stage' NOT NULL,
  	"focus_sector_label" varchar DEFAULT 'Sector / Themes operating in (Select One)' NOT NULL,
  	"focus_sector_required" boolean DEFAULT true,
  	"focus_stage_label" varchar DEFAULT 'Growth Stage of your Startup (Select One)' NOT NULL,
  	"focus_stage_required" boolean DEFAULT true,
  	"story_title" varchar DEFAULT 'Vision & edge' NOT NULL,
  	"story_vision_label" varchar DEFAULT 'What is your vision for the business?' NOT NULL,
  	"story_vision_placeholder" varchar,
  	"story_vision_required" boolean DEFAULT false,
  	"story_vision_help" varchar,
  	"story_superiority_label" varchar DEFAULT 'How is your product/solution/service superior to the existing alternatives?' NOT NULL,
  	"story_superiority_placeholder" varchar,
  	"story_superiority_required" boolean DEFAULT false,
  	"story_superiority_help" varchar,
  	"proof_title" varchar DEFAULT 'Early proof' NOT NULL,
  	"proof_traction_label" varchar DEFAULT 'Have you found users of your product/solution/service? If yes, what does the traction look like?' NOT NULL,
  	"proof_traction_placeholder" varchar,
  	"proof_traction_required" boolean DEFAULT false,
  	"proof_traction_help" varchar,
  	"proof_willingness_to_pay_label" varchar DEFAULT 'Why are these users paying or willing to pay for your product/solution/service?' NOT NULL,
  	"proof_willingness_to_pay_placeholder" varchar,
  	"proof_willingness_to_pay_required" boolean DEFAULT false,
  	"proof_willingness_to_pay_help" varchar,
  	"market_title" varchar DEFAULT 'Market & moat' NOT NULL,
  	"market_market_label" varchar DEFAULT 'How big is your target market and what is its growth potential?' NOT NULL,
  	"market_market_placeholder" varchar,
  	"market_market_required" boolean DEFAULT false,
  	"market_market_help" varchar,
  	"market_defensibility_label" varchar DEFAULT 'When the product/solution/service gets traction, will the product/solution/service have unique features that are hard to copy? If yes, what are they?' NOT NULL,
  	"market_defensibility_placeholder" varchar,
  	"market_defensibility_required" boolean DEFAULT false,
  	"market_defensibility_help" varchar,
  	"plan_title" varchar DEFAULT 'Building to scale' NOT NULL,
  	"plan_build_plan_label" varchar DEFAULT 'How do you plan to get the team, knowledge and capital to build & scale this product/solution/service?' NOT NULL,
  	"plan_build_plan_placeholder" varchar,
  	"plan_build_plan_required" boolean DEFAULT false,
  	"plan_build_plan_help" varchar,
  	"deck_title" varchar DEFAULT 'Deck & consent' NOT NULL,
  	"deck_label" varchar DEFAULT 'Pitch Deck',
  	"deck_help" varchar DEFAULT 'Maximum 25MB. Your deck stays private.',
  	"deck_max_size_m_b" numeric DEFAULT 25,
  	"deck_required" boolean DEFAULT true,
  	"deck_browse_label" varchar DEFAULT 'Choose a file',
  	"deck_drop_label" varchar DEFAULT 'or drag and drop it here',
  	"deck_replace_label" varchar DEFAULT 'Replace file',
  	"deck_formats_note" varchar DEFAULT 'PDF, PPT, PPTX or Keynote',
  	"deck_consent_heading" varchar DEFAULT 'Consent and submission',
  	"deck_consent_label" varchar DEFAULT 'I consent to NanoPocket Ventures storing this submission and reviewing it with relevant team members and advisors.',
  	"step_label" varchar DEFAULT 'Step',
  	"back_label" varchar DEFAULT 'Back',
  	"continue_label" varchar DEFAULT 'Continue',
  	"submit_label" varchar DEFAULT 'Submit application',
  	"submitting_label" varchar DEFAULT 'Submitting…',
  	"optional_label" varchar DEFAULT 'Optional',
  	"required_note" varchar DEFAULT 'Fields marked * are required.',
  	"success_title" varchar DEFAULT 'Signal received.',
  	"success_body" varchar,
  	"restart_label" varchar DEFAULT 'Submit another application',
  	"error_required" varchar DEFAULT 'Please answer this question.',
  	"error_choice" varchar DEFAULT 'Please choose an option.',
  	"error_email" varchar DEFAULT 'Please enter a valid e-mail address.',
  	"error_url" varchar DEFAULT 'Please enter a valid web address.',
  	"error_file_missing" varchar DEFAULT 'Please attach your pitch deck.',
  	"error_file_size" varchar DEFAULT 'This file is larger than the allowed size.',
  	"error_file_type" varchar DEFAULT 'Please upload a PDF, PPT, PPTX or Keynote file.',
  	"error_consent" varchar DEFAULT 'Please give your consent to submit.',
  	"error_generic" varchar DEFAULT 'Something went wrong while sending. Please try again in a moment.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "enquiry_forms_forms_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "enquiry_forms_forms_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_enquiry_forms_forms_fields_type" DEFAULT 'text' NOT NULL,
  	"placeholder" varchar,
  	"width" "enum_enquiry_forms_forms_fields_width" DEFAULT 'full',
  	"required" boolean DEFAULT false
  );
  
  CREATE TABLE "enquiry_forms_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"tab_label" varchar NOT NULL,
  	"intro" varchar,
  	"consent_label" varchar,
  	"submit_label" varchar DEFAULT 'Send message',
  	"success_message" varchar DEFAULT 'Thank you — we will be in touch.'
  );
  
  CREATE TABLE "enquiry_forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tabs_label" varchar DEFAULT 'Choose an enquiry type',
  	"sending_label" varchar DEFAULT 'Sending…',
  	"optional_label" varchar DEFAULT 'Optional',
  	"select_placeholder" varchar DEFAULT 'Select an option',
  	"error_required" varchar DEFAULT 'This field is required.',
  	"error_email" varchar DEFAULT 'Please enter a valid e-mail address.',
  	"error_url" varchar DEFAULT 'Please enter a valid web address.',
  	"error_consent" varchar DEFAULT 'Please give your consent to send this message.',
  	"error_generic" varchar DEFAULT 'Something went wrong while sending. Please try again in a moment.',
  	"another_label" varchar DEFAULT 'Send another message',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_tiles" ADD CONSTRAINT "pages_blocks_hero_tiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_tiles" ADD CONSTRAINT "pages_blocks_hero_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_destinations" ADD CONSTRAINT "pages_blocks_hero_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_inline_image_id_media_id_fk" FOREIGN KEY ("inline_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_lines" ADD CONSTRAINT "pages_blocks_statement_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_tiles" ADD CONSTRAINT "pages_blocks_statement_tiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_tiles" ADD CONSTRAINT "pages_blocks_statement_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_paragraphs" ADD CONSTRAINT "pages_blocks_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_facts" ADD CONSTRAINT "pages_blocks_about_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_criteria_ctas" ADD CONSTRAINT "pages_blocks_criteria_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_criteria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_criteria_items" ADD CONSTRAINT "pages_blocks_criteria_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_criteria_items" ADD CONSTRAINT "pages_blocks_criteria_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_criteria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_criteria" ADD CONSTRAINT "pages_blocks_criteria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_pillars" ADD CONSTRAINT "pages_blocks_thesis_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_thesis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_facts" ADD CONSTRAINT "pages_blocks_thesis_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_thesis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_sectors_tags" ADD CONSTRAINT "pages_blocks_thesis_sectors_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_thesis_sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_sectors_notes" ADD CONSTRAINT "pages_blocks_thesis_sectors_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_thesis_sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_sectors" ADD CONSTRAINT "pages_blocks_thesis_sectors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_sectors" ADD CONSTRAINT "pages_blocks_thesis_sectors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_thesis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_ctas" ADD CONSTRAINT "pages_blocks_thesis_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_thesis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis" ADD CONSTRAINT "pages_blocks_thesis_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_highlights" ADD CONSTRAINT "pages_blocks_portfolio_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_pillars" ADD CONSTRAINT "pages_blocks_portfolio_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_number_groups_items" ADD CONSTRAINT "pages_blocks_portfolio_number_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio_number_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_number_groups" ADD CONSTRAINT "pages_blocks_portfolio_number_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_ctas" ADD CONSTRAINT "pages_blocks_portfolio_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio" ADD CONSTRAINT "pages_blocks_portfolio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_marquee" ADD CONSTRAINT "pages_blocks_team_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts" ADD CONSTRAINT "pages_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pitch_note_links" ADD CONSTRAINT "pages_blocks_pitch_note_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pitch"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pitch" ADD CONSTRAINT "pages_blocks_pitch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_access_links" ADD CONSTRAINT "pages_blocks_contact_access_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_tiles" ADD CONSTRAINT "_pages_v_blocks_hero_tiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_tiles" ADD CONSTRAINT "_pages_v_blocks_hero_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_destinations" ADD CONSTRAINT "_pages_v_blocks_hero_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_inline_image_id_media_id_fk" FOREIGN KEY ("inline_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_lines" ADD CONSTRAINT "_pages_v_blocks_statement_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_tiles" ADD CONSTRAINT "_pages_v_blocks_statement_tiles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_tiles" ADD CONSTRAINT "_pages_v_blocks_statement_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_paragraphs" ADD CONSTRAINT "_pages_v_blocks_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_facts" ADD CONSTRAINT "_pages_v_blocks_about_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_criteria_ctas" ADD CONSTRAINT "_pages_v_blocks_criteria_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_criteria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_criteria_items" ADD CONSTRAINT "_pages_v_blocks_criteria_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_criteria_items" ADD CONSTRAINT "_pages_v_blocks_criteria_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_criteria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_criteria" ADD CONSTRAINT "_pages_v_blocks_criteria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_pillars" ADD CONSTRAINT "_pages_v_blocks_thesis_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_thesis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_facts" ADD CONSTRAINT "_pages_v_blocks_thesis_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_thesis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_sectors_tags" ADD CONSTRAINT "_pages_v_blocks_thesis_sectors_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_thesis_sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_sectors_notes" ADD CONSTRAINT "_pages_v_blocks_thesis_sectors_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_thesis_sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_sectors" ADD CONSTRAINT "_pages_v_blocks_thesis_sectors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_sectors" ADD CONSTRAINT "_pages_v_blocks_thesis_sectors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_thesis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_ctas" ADD CONSTRAINT "_pages_v_blocks_thesis_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_thesis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis" ADD CONSTRAINT "_pages_v_blocks_thesis_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_highlights" ADD CONSTRAINT "_pages_v_blocks_portfolio_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_pillars" ADD CONSTRAINT "_pages_v_blocks_portfolio_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_number_groups_items" ADD CONSTRAINT "_pages_v_blocks_portfolio_number_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio_number_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_number_groups" ADD CONSTRAINT "_pages_v_blocks_portfolio_number_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_ctas" ADD CONSTRAINT "_pages_v_blocks_portfolio_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio" ADD CONSTRAINT "_pages_v_blocks_portfolio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_marquee" ADD CONSTRAINT "_pages_v_blocks_team_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts" ADD CONSTRAINT "_pages_v_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pitch_note_links" ADD CONSTRAINT "_pages_v_blocks_pitch_note_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pitch"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pitch" ADD CONSTRAINT "_pages_v_blocks_pitch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_access_links" ADD CONSTRAINT "_pages_v_blocks_contact_access_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "insights" ADD CONSTRAINT "insights_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "insights" ADD CONSTRAINT "insights_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insights_v" ADD CONSTRAINT "_insights_v_parent_id_insights_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."insights"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insights_v" ADD CONSTRAINT "_insights_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insights_v" ADD CONSTRAINT "_insights_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press" ADD CONSTRAINT "press_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_companies" ADD CONSTRAINT "portfolio_companies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pitch_submissions" ADD CONSTRAINT "pitch_submissions_deck_id_pitch_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."pitch_decks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enquiries_answers" ADD CONSTRAINT "enquiries_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_insights_fk" FOREIGN KEY ("insights_id") REFERENCES "public"."insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_press_fk" FOREIGN KEY ("press_id") REFERENCES "public"."press"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_companies_fk" FOREIGN KEY ("portfolio_companies_id") REFERENCES "public"."portfolio_companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pitch_submissions_fk" FOREIGN KEY ("pitch_submissions_id") REFERENCES "public"."pitch_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pitch_decks_fk" FOREIGN KEY ("pitch_decks_id") REFERENCES "public"."pitch_decks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_buttons" ADD CONSTRAINT "header_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_fund_items" ADD CONSTRAINT "footer_fund_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_navigate_links" ADD CONSTRAINT "footer_navigate_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_access_links" ADD CONSTRAINT "footer_access_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pitch_form_thesis_links" ADD CONSTRAINT "pitch_form_thesis_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pitch_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pitch_form_focus_sector_options" ADD CONSTRAINT "pitch_form_focus_sector_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pitch_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pitch_form_focus_stage_options" ADD CONSTRAINT "pitch_form_focus_stage_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pitch_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enquiry_forms_forms_fields_options" ADD CONSTRAINT "enquiry_forms_forms_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiry_forms_forms_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enquiry_forms_forms_fields" ADD CONSTRAINT "enquiry_forms_forms_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiry_forms_forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enquiry_forms_forms" ADD CONSTRAINT "enquiry_forms_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiry_forms"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_tiles_order_idx" ON "pages_blocks_hero_tiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_tiles_parent_id_idx" ON "pages_blocks_hero_tiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_tiles_image_idx" ON "pages_blocks_hero_tiles" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_destinations_order_idx" ON "pages_blocks_hero_destinations" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_destinations_parent_id_idx" ON "pages_blocks_hero_destinations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_inline_image_idx" ON "pages_blocks_hero" USING btree ("inline_image_id");
  CREATE INDEX "pages_blocks_statement_lines_order_idx" ON "pages_blocks_statement_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_lines_parent_id_idx" ON "pages_blocks_statement_lines" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_tiles_order_idx" ON "pages_blocks_statement_tiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_tiles_parent_id_idx" ON "pages_blocks_statement_tiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_tiles_image_idx" ON "pages_blocks_statement_tiles" USING btree ("image_id");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_paragraphs_order_idx" ON "pages_blocks_about_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_paragraphs_parent_id_idx" ON "pages_blocks_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_facts_order_idx" ON "pages_blocks_about_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_facts_parent_id_idx" ON "pages_blocks_about_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_image_idx" ON "pages_blocks_about" USING btree ("image_id");
  CREATE INDEX "pages_blocks_criteria_ctas_order_idx" ON "pages_blocks_criteria_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_criteria_ctas_parent_id_idx" ON "pages_blocks_criteria_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_criteria_items_order_idx" ON "pages_blocks_criteria_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_criteria_items_parent_id_idx" ON "pages_blocks_criteria_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_criteria_items_image_idx" ON "pages_blocks_criteria_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_criteria_order_idx" ON "pages_blocks_criteria" USING btree ("_order");
  CREATE INDEX "pages_blocks_criteria_parent_id_idx" ON "pages_blocks_criteria" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_criteria_path_idx" ON "pages_blocks_criteria" USING btree ("_path");
  CREATE INDEX "pages_blocks_thesis_pillars_order_idx" ON "pages_blocks_thesis_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_pillars_parent_id_idx" ON "pages_blocks_thesis_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_facts_order_idx" ON "pages_blocks_thesis_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_facts_parent_id_idx" ON "pages_blocks_thesis_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_sectors_tags_order_idx" ON "pages_blocks_thesis_sectors_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_sectors_tags_parent_id_idx" ON "pages_blocks_thesis_sectors_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_sectors_notes_order_idx" ON "pages_blocks_thesis_sectors_notes" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_sectors_notes_parent_id_idx" ON "pages_blocks_thesis_sectors_notes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_sectors_order_idx" ON "pages_blocks_thesis_sectors" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_sectors_parent_id_idx" ON "pages_blocks_thesis_sectors" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_sectors_image_idx" ON "pages_blocks_thesis_sectors" USING btree ("image_id");
  CREATE INDEX "pages_blocks_thesis_ctas_order_idx" ON "pages_blocks_thesis_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_ctas_parent_id_idx" ON "pages_blocks_thesis_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_order_idx" ON "pages_blocks_thesis" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_parent_id_idx" ON "pages_blocks_thesis" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_path_idx" ON "pages_blocks_thesis" USING btree ("_path");
  CREATE INDEX "pages_blocks_portfolio_highlights_order_idx" ON "pages_blocks_portfolio_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_highlights_parent_id_idx" ON "pages_blocks_portfolio_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_pillars_order_idx" ON "pages_blocks_portfolio_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_pillars_parent_id_idx" ON "pages_blocks_portfolio_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_number_groups_items_order_idx" ON "pages_blocks_portfolio_number_groups_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_number_groups_items_parent_id_idx" ON "pages_blocks_portfolio_number_groups_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_number_groups_order_idx" ON "pages_blocks_portfolio_number_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_number_groups_parent_id_idx" ON "pages_blocks_portfolio_number_groups" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_ctas_order_idx" ON "pages_blocks_portfolio_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_ctas_parent_id_idx" ON "pages_blocks_portfolio_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_order_idx" ON "pages_blocks_portfolio" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_parent_id_idx" ON "pages_blocks_portfolio" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_path_idx" ON "pages_blocks_portfolio" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_marquee_order_idx" ON "pages_blocks_team_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_marquee_parent_id_idx" ON "pages_blocks_team_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_posts_order_idx" ON "pages_blocks_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_parent_id_idx" ON "pages_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posts_path_idx" ON "pages_blocks_posts" USING btree ("_path");
  CREATE INDEX "pages_blocks_pitch_note_links_order_idx" ON "pages_blocks_pitch_note_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_pitch_note_links_parent_id_idx" ON "pages_blocks_pitch_note_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pitch_order_idx" ON "pages_blocks_pitch" USING btree ("_order");
  CREATE INDEX "pages_blocks_pitch_parent_id_idx" ON "pages_blocks_pitch" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pitch_path_idx" ON "pages_blocks_pitch" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_access_links_order_idx" ON "pages_blocks_contact_access_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_access_links_parent_id_idx" ON "pages_blocks_contact_access_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_team_members_id_idx" ON "pages_rels" USING btree ("team_members_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_order_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_ctas_parent_id_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_tiles_order_idx" ON "_pages_v_blocks_hero_tiles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_tiles_parent_id_idx" ON "_pages_v_blocks_hero_tiles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_tiles_image_idx" ON "_pages_v_blocks_hero_tiles" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_destinations_order_idx" ON "_pages_v_blocks_hero_destinations" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_destinations_parent_id_idx" ON "_pages_v_blocks_hero_destinations" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_inline_image_idx" ON "_pages_v_blocks_hero" USING btree ("inline_image_id");
  CREATE INDEX "_pages_v_blocks_statement_lines_order_idx" ON "_pages_v_blocks_statement_lines" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_lines_parent_id_idx" ON "_pages_v_blocks_statement_lines" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_tiles_order_idx" ON "_pages_v_blocks_statement_tiles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_tiles_parent_id_idx" ON "_pages_v_blocks_statement_tiles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_tiles_image_idx" ON "_pages_v_blocks_statement_tiles" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_paragraphs_order_idx" ON "_pages_v_blocks_about_paragraphs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_paragraphs_parent_id_idx" ON "_pages_v_blocks_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_facts_order_idx" ON "_pages_v_blocks_about_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_facts_parent_id_idx" ON "_pages_v_blocks_about_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_image_idx" ON "_pages_v_blocks_about" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_criteria_ctas_order_idx" ON "_pages_v_blocks_criteria_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_criteria_ctas_parent_id_idx" ON "_pages_v_blocks_criteria_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_criteria_items_order_idx" ON "_pages_v_blocks_criteria_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_criteria_items_parent_id_idx" ON "_pages_v_blocks_criteria_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_criteria_items_image_idx" ON "_pages_v_blocks_criteria_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_criteria_order_idx" ON "_pages_v_blocks_criteria" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_criteria_parent_id_idx" ON "_pages_v_blocks_criteria" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_criteria_path_idx" ON "_pages_v_blocks_criteria" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_thesis_pillars_order_idx" ON "_pages_v_blocks_thesis_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_pillars_parent_id_idx" ON "_pages_v_blocks_thesis_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_facts_order_idx" ON "_pages_v_blocks_thesis_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_facts_parent_id_idx" ON "_pages_v_blocks_thesis_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_sectors_tags_order_idx" ON "_pages_v_blocks_thesis_sectors_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_sectors_tags_parent_id_idx" ON "_pages_v_blocks_thesis_sectors_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_sectors_notes_order_idx" ON "_pages_v_blocks_thesis_sectors_notes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_sectors_notes_parent_id_idx" ON "_pages_v_blocks_thesis_sectors_notes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_sectors_order_idx" ON "_pages_v_blocks_thesis_sectors" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_sectors_parent_id_idx" ON "_pages_v_blocks_thesis_sectors" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_sectors_image_idx" ON "_pages_v_blocks_thesis_sectors" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_thesis_ctas_order_idx" ON "_pages_v_blocks_thesis_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_ctas_parent_id_idx" ON "_pages_v_blocks_thesis_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_order_idx" ON "_pages_v_blocks_thesis" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_parent_id_idx" ON "_pages_v_blocks_thesis" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_path_idx" ON "_pages_v_blocks_thesis" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_portfolio_highlights_order_idx" ON "_pages_v_blocks_portfolio_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_highlights_parent_id_idx" ON "_pages_v_blocks_portfolio_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_pillars_order_idx" ON "_pages_v_blocks_portfolio_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_pillars_parent_id_idx" ON "_pages_v_blocks_portfolio_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_number_groups_items_order_idx" ON "_pages_v_blocks_portfolio_number_groups_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_number_groups_items_parent_id_idx" ON "_pages_v_blocks_portfolio_number_groups_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_number_groups_order_idx" ON "_pages_v_blocks_portfolio_number_groups" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_number_groups_parent_id_idx" ON "_pages_v_blocks_portfolio_number_groups" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_ctas_order_idx" ON "_pages_v_blocks_portfolio_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_ctas_parent_id_idx" ON "_pages_v_blocks_portfolio_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_order_idx" ON "_pages_v_blocks_portfolio" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_parent_id_idx" ON "_pages_v_blocks_portfolio" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_path_idx" ON "_pages_v_blocks_portfolio" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_marquee_order_idx" ON "_pages_v_blocks_team_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_marquee_parent_id_idx" ON "_pages_v_blocks_team_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_posts_order_idx" ON "_pages_v_blocks_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_parent_id_idx" ON "_pages_v_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_path_idx" ON "_pages_v_blocks_posts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pitch_note_links_order_idx" ON "_pages_v_blocks_pitch_note_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pitch_note_links_parent_id_idx" ON "_pages_v_blocks_pitch_note_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pitch_order_idx" ON "_pages_v_blocks_pitch" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pitch_parent_id_idx" ON "_pages_v_blocks_pitch" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pitch_path_idx" ON "_pages_v_blocks_pitch" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_access_links_order_idx" ON "_pages_v_blocks_contact_access_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_access_links_parent_id_idx" ON "_pages_v_blocks_contact_access_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_team_members_id_idx" ON "_pages_v_rels" USING btree ("team_members_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "insights_slug_idx" ON "insights" USING btree ("slug");
  CREATE INDEX "insights_cover_idx" ON "insights" USING btree ("cover_id");
  CREATE INDEX "insights_meta_meta_image_idx" ON "insights" USING btree ("meta_image_id");
  CREATE INDEX "insights_updated_at_idx" ON "insights" USING btree ("updated_at");
  CREATE INDEX "insights_created_at_idx" ON "insights" USING btree ("created_at");
  CREATE INDEX "insights__status_idx" ON "insights" USING btree ("_status");
  CREATE INDEX "_insights_v_parent_idx" ON "_insights_v" USING btree ("parent_id");
  CREATE INDEX "_insights_v_version_version_slug_idx" ON "_insights_v" USING btree ("version_slug");
  CREATE INDEX "_insights_v_version_version_cover_idx" ON "_insights_v" USING btree ("version_cover_id");
  CREATE INDEX "_insights_v_version_meta_version_meta_image_idx" ON "_insights_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_insights_v_version_version_updated_at_idx" ON "_insights_v" USING btree ("version_updated_at");
  CREATE INDEX "_insights_v_version_version_created_at_idx" ON "_insights_v" USING btree ("version_created_at");
  CREATE INDEX "_insights_v_version_version__status_idx" ON "_insights_v" USING btree ("version__status");
  CREATE INDEX "_insights_v_created_at_idx" ON "_insights_v" USING btree ("created_at");
  CREATE INDEX "_insights_v_updated_at_idx" ON "_insights_v" USING btree ("updated_at");
  CREATE INDEX "_insights_v_latest_idx" ON "_insights_v" USING btree ("latest");
  CREATE INDEX "_insights_v_autosave_idx" ON "_insights_v" USING btree ("autosave");
  CREATE INDEX "press_image_idx" ON "press" USING btree ("image_id");
  CREATE INDEX "press_updated_at_idx" ON "press" USING btree ("updated_at");
  CREATE INDEX "press_created_at_idx" ON "press" USING btree ("created_at");
  CREATE INDEX "portfolio_companies_logo_idx" ON "portfolio_companies" USING btree ("logo_id");
  CREATE INDEX "portfolio_companies_updated_at_idx" ON "portfolio_companies" USING btree ("updated_at");
  CREATE INDEX "portfolio_companies_created_at_idx" ON "portfolio_companies" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_wide_sizes_wide_filename_idx" ON "media" USING btree ("sizes_wide_filename");
  CREATE INDEX "pitch_submissions_deck_idx" ON "pitch_submissions" USING btree ("deck_id");
  CREATE INDEX "pitch_submissions_updated_at_idx" ON "pitch_submissions" USING btree ("updated_at");
  CREATE INDEX "pitch_submissions_created_at_idx" ON "pitch_submissions" USING btree ("created_at");
  CREATE INDEX "enquiries_answers_order_idx" ON "enquiries_answers" USING btree ("_order");
  CREATE INDEX "enquiries_answers_parent_id_idx" ON "enquiries_answers" USING btree ("_parent_id");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE INDEX "pitch_decks_updated_at_idx" ON "pitch_decks" USING btree ("updated_at");
  CREATE INDEX "pitch_decks_created_at_idx" ON "pitch_decks" USING btree ("created_at");
  CREATE UNIQUE INDEX "pitch_decks_filename_idx" ON "pitch_decks" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_insights_id_idx" ON "payload_locked_documents_rels" USING btree ("insights_id");
  CREATE INDEX "payload_locked_documents_rels_press_id_idx" ON "payload_locked_documents_rels" USING btree ("press_id");
  CREATE INDEX "payload_locked_documents_rels_portfolio_companies_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolio_companies_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pitch_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("pitch_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_pitch_decks_id_idx" ON "payload_locked_documents_rels" USING btree ("pitch_decks_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");
  CREATE INDEX "header_buttons_order_idx" ON "header_buttons" USING btree ("_order");
  CREATE INDEX "header_buttons_parent_id_idx" ON "header_buttons" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_fund_items_order_idx" ON "footer_fund_items" USING btree ("_order");
  CREATE INDEX "footer_fund_items_parent_id_idx" ON "footer_fund_items" USING btree ("_parent_id");
  CREATE INDEX "footer_navigate_links_order_idx" ON "footer_navigate_links" USING btree ("_order");
  CREATE INDEX "footer_navigate_links_parent_id_idx" ON "footer_navigate_links" USING btree ("_parent_id");
  CREATE INDEX "footer_access_links_order_idx" ON "footer_access_links" USING btree ("_order");
  CREATE INDEX "footer_access_links_parent_id_idx" ON "footer_access_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "pitch_form_thesis_links_order_idx" ON "pitch_form_thesis_links" USING btree ("_order");
  CREATE INDEX "pitch_form_thesis_links_parent_id_idx" ON "pitch_form_thesis_links" USING btree ("_parent_id");
  CREATE INDEX "pitch_form_focus_sector_options_order_idx" ON "pitch_form_focus_sector_options" USING btree ("_order");
  CREATE INDEX "pitch_form_focus_sector_options_parent_id_idx" ON "pitch_form_focus_sector_options" USING btree ("_parent_id");
  CREATE INDEX "pitch_form_focus_stage_options_order_idx" ON "pitch_form_focus_stage_options" USING btree ("_order");
  CREATE INDEX "pitch_form_focus_stage_options_parent_id_idx" ON "pitch_form_focus_stage_options" USING btree ("_parent_id");
  CREATE INDEX "enquiry_forms_forms_fields_options_order_idx" ON "enquiry_forms_forms_fields_options" USING btree ("_order");
  CREATE INDEX "enquiry_forms_forms_fields_options_parent_id_idx" ON "enquiry_forms_forms_fields_options" USING btree ("_parent_id");
  CREATE INDEX "enquiry_forms_forms_fields_order_idx" ON "enquiry_forms_forms_fields" USING btree ("_order");
  CREATE INDEX "enquiry_forms_forms_fields_parent_id_idx" ON "enquiry_forms_forms_fields" USING btree ("_parent_id");
  CREATE INDEX "enquiry_forms_forms_order_idx" ON "enquiry_forms_forms" USING btree ("_order");
  CREATE INDEX "enquiry_forms_forms_parent_id_idx" ON "enquiry_forms_forms" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero_tiles" CASCADE;
  DROP TABLE "pages_blocks_hero_destinations" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_statement_lines" CASCADE;
  DROP TABLE "pages_blocks_statement_tiles" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_about_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_about_facts" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_criteria_ctas" CASCADE;
  DROP TABLE "pages_blocks_criteria_items" CASCADE;
  DROP TABLE "pages_blocks_criteria" CASCADE;
  DROP TABLE "pages_blocks_thesis_pillars" CASCADE;
  DROP TABLE "pages_blocks_thesis_facts" CASCADE;
  DROP TABLE "pages_blocks_thesis_sectors_tags" CASCADE;
  DROP TABLE "pages_blocks_thesis_sectors_notes" CASCADE;
  DROP TABLE "pages_blocks_thesis_sectors" CASCADE;
  DROP TABLE "pages_blocks_thesis_ctas" CASCADE;
  DROP TABLE "pages_blocks_thesis" CASCADE;
  DROP TABLE "pages_blocks_portfolio_highlights" CASCADE;
  DROP TABLE "pages_blocks_portfolio_pillars" CASCADE;
  DROP TABLE "pages_blocks_portfolio_number_groups_items" CASCADE;
  DROP TABLE "pages_blocks_portfolio_number_groups" CASCADE;
  DROP TABLE "pages_blocks_portfolio_ctas" CASCADE;
  DROP TABLE "pages_blocks_portfolio" CASCADE;
  DROP TABLE "pages_blocks_team_marquee" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_posts" CASCADE;
  DROP TABLE "pages_blocks_pitch_note_links" CASCADE;
  DROP TABLE "pages_blocks_pitch" CASCADE;
  DROP TABLE "pages_blocks_contact_access_links" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_tiles" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_destinations" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_lines" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_tiles" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_about_paragraphs" CASCADE;
  DROP TABLE "_pages_v_blocks_about_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_criteria_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_criteria_items" CASCADE;
  DROP TABLE "_pages_v_blocks_criteria" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis_sectors_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis_sectors_notes" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis_sectors" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_number_groups_items" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_number_groups" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio" CASCADE;
  DROP TABLE "_pages_v_blocks_team_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_pitch_note_links" CASCADE;
  DROP TABLE "_pages_v_blocks_pitch" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_access_links" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "insights" CASCADE;
  DROP TABLE "_insights_v" CASCADE;
  DROP TABLE "press" CASCADE;
  DROP TABLE "portfolio_companies" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pitch_submissions" CASCADE;
  DROP TABLE "enquiries_answers" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "pitch_decks" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "header_buttons" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_fund_items" CASCADE;
  DROP TABLE "footer_navigate_links" CASCADE;
  DROP TABLE "footer_access_links" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "pitch_form_thesis_links" CASCADE;
  DROP TABLE "pitch_form_focus_sector_options" CASCADE;
  DROP TABLE "pitch_form_focus_stage_options" CASCADE;
  DROP TABLE "pitch_form" CASCADE;
  DROP TABLE "enquiry_forms_forms_fields_options" CASCADE;
  DROP TABLE "enquiry_forms_forms_fields" CASCADE;
  DROP TABLE "enquiry_forms_forms" CASCADE;
  DROP TABLE "enquiry_forms" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_tiles_art";
  DROP TYPE "public"."enum_pages_blocks_hero_inline_art";
  DROP TYPE "public"."enum_pages_blocks_hero_visual";
  DROP TYPE "public"."enum_pages_blocks_hero_theme";
  DROP TYPE "public"."enum_pages_blocks_statement_lines_inline";
  DROP TYPE "public"."enum_pages_blocks_statement_tiles_art";
  DROP TYPE "public"."enum_pages_blocks_statement_theme";
  DROP TYPE "public"."enum_pages_blocks_about_art";
  DROP TYPE "public"."enum_pages_blocks_about_theme";
  DROP TYPE "public"."enum_pages_blocks_criteria_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_criteria_items_art";
  DROP TYPE "public"."enum_pages_blocks_criteria_theme";
  DROP TYPE "public"."enum_pages_blocks_thesis_sectors_art";
  DROP TYPE "public"."enum_pages_blocks_thesis_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_thesis_theme";
  DROP TYPE "public"."enum_pages_blocks_portfolio_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_portfolio_theme";
  DROP TYPE "public"."enum_pages_blocks_team_theme";
  DROP TYPE "public"."enum_pages_blocks_posts_source";
  DROP TYPE "public"."enum_pages_blocks_posts_theme";
  DROP TYPE "public"."enum_pages_blocks_pitch_theme";
  DROP TYPE "public"."enum_pages_blocks_contact_theme";
  DROP TYPE "public"."enum_pages_blocks_rich_text_theme";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_tiles_art";
  DROP TYPE "public"."enum__pages_v_blocks_hero_inline_art";
  DROP TYPE "public"."enum__pages_v_blocks_hero_visual";
  DROP TYPE "public"."enum__pages_v_blocks_hero_theme";
  DROP TYPE "public"."enum__pages_v_blocks_statement_lines_inline";
  DROP TYPE "public"."enum__pages_v_blocks_statement_tiles_art";
  DROP TYPE "public"."enum__pages_v_blocks_statement_theme";
  DROP TYPE "public"."enum__pages_v_blocks_about_art";
  DROP TYPE "public"."enum__pages_v_blocks_about_theme";
  DROP TYPE "public"."enum__pages_v_blocks_criteria_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_criteria_items_art";
  DROP TYPE "public"."enum__pages_v_blocks_criteria_theme";
  DROP TYPE "public"."enum__pages_v_blocks_thesis_sectors_art";
  DROP TYPE "public"."enum__pages_v_blocks_thesis_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_thesis_theme";
  DROP TYPE "public"."enum__pages_v_blocks_portfolio_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_portfolio_theme";
  DROP TYPE "public"."enum__pages_v_blocks_team_theme";
  DROP TYPE "public"."enum__pages_v_blocks_posts_source";
  DROP TYPE "public"."enum__pages_v_blocks_posts_theme";
  DROP TYPE "public"."enum__pages_v_blocks_pitch_theme";
  DROP TYPE "public"."enum__pages_v_blocks_contact_theme";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_theme";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_insights_status";
  DROP TYPE "public"."enum__insights_v_version_status";
  DROP TYPE "public"."enum_pitch_submissions_status";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_enquiry_forms_forms_fields_type";
  DROP TYPE "public"."enum_enquiry_forms_forms_fields_width";`)
}
