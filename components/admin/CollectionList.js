import Link from "next/link";
import Image from "next/image";

const CollectionList = ({ collections }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Collections
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {collections.map((collection) => (
            <Link href={`/admin/collections/${collection.collection_id}`}>
              <a className="group">
                <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
                  <div className="relative group-hover:opacity-75 h-72">
                    <Image
                      src={collection.image.src}
                      alt={collection.image.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {collection.title}
                </h3>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
