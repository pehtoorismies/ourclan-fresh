// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *Album → images*
 */
export interface AlbumDocumentDataImagesItem {
	/**
	 * image field in *Album → images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: album.images[].image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<"small" | "medium" | "large" | "xlarge">;
	
	/**
	 * imageTitle field in *Album → images*
	 *
	 * - **Field Type**: Title
	 * - **Placeholder**: *None*
	 * - **API ID Path**: album.images[].imagetitle
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	imagetitle: prismic.TitleField;
}

/**
 * Content for Album documents
 */
interface AlbumDocumentData {
	/**
	 * albumtitle field in *Album*
	 *
	 * - **Field Type**: Title
	 * - **Placeholder**: *None*
	 * - **API ID Path**: album.albumtitle
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	albumtitle: prismic.TitleField;
	
	/**
	 * mainimage field in *Album*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: album.mainimage
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	mainimage: prismic.ImageField<"small">;
	
	/**
	 * order field in *Album*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: Albumin järjestys
	 * - **API ID Path**: album.order
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#number
	 */
	order: prismic.NumberField;/**
	 * images field in *Album*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: album.images[]
	 * - **Tab**: Images
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	images: prismic.GroupField<Simplify<AlbumDocumentDataImagesItem>>;
}

/**
 * Album document from Prismic
 *
 * - **API ID**: `album`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AlbumDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<AlbumDocumentData>, "album", Lang>;

interface FamilytreeDocumentData {}

/**
 * FamilyTree document from Prismic
 *
 * - **API ID**: `familytree`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FamilytreeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<FamilytreeDocumentData>, "familytree", Lang>;

/**
 * Item in *front-page → contentblock*
 */
export interface FrontPageDocumentDataContentblockItem {
	/**
	 * image field in *front-page → contentblock*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: front-page.contentblock[].image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * title field in *front-page → contentblock*
	 *
	 * - **Field Type**: Title
	 * - **Placeholder**: *None*
	 * - **API ID Path**: front-page.contentblock[].title
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	title: prismic.TitleField;
	
	/**
	 * description field in *front-page → contentblock*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: front-page.contentblock[].description
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	description: prismic.RichTextField;
}

/**
 * Content for front-page documents
 */
interface FrontPageDocumentData {
	/**
	 * contentblock field in *front-page*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: front-page.contentblock[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	contentblock: prismic.GroupField<Simplify<FrontPageDocumentDataContentblockItem>>;
}

/**
 * front-page document from Prismic
 *
 * - **API ID**: `front-page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FrontPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<FrontPageDocumentData>, "front-page", Lang>;

/**
 * Content for RichImage documents
 */
interface RichimageDocumentData {
	/**
	 * albumName field in *RichImage*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: richimage.albumname
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	albumname: prismic.ContentRelationshipField<"album">;
	
	/**
	 * image field in *RichImage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: richimage.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<"small" | "medium">;
	
	/**
	 * title field in *RichImage*
	 *
	 * - **Field Type**: Title
	 * - **Placeholder**: *None*
	 * - **API ID Path**: richimage.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	title: prismic.TitleField;
}

/**
 * RichImage document from Prismic
 *
 * - **API ID**: `richimage`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RichimageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<RichimageDocumentData>, "richimage", Lang>;

interface Sukujuhlat482018DocumentData {}

/**
 * Sukujuhlat 4.8.2018 document from Prismic
 *
 * - **API ID**: `sukujuhlat_482018`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type Sukujuhlat482018Document<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<Sukujuhlat482018DocumentData>, "sukujuhlat_482018", Lang>;

export type AllDocumentTypes = AlbumDocument | FamilytreeDocument | FrontPageDocument | RichimageDocument | Sukujuhlat482018Document;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			AlbumDocument,
			AlbumDocumentData,
			AlbumDocumentDataImagesItem,
			FamilytreeDocument,
			FamilytreeDocumentData,
			FrontPageDocument,
			FrontPageDocumentData,
			FrontPageDocumentDataContentblockItem,
			RichimageDocument,
			RichimageDocumentData,
			Sukujuhlat482018Document,
			Sukujuhlat482018DocumentData,
			AllDocumentTypes
		}
	}
}