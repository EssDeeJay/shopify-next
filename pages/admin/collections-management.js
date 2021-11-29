import { getCollectionsList } from "../../lib/adminShopify";
import Head from "next/head";
import CollectionList from "../../components/admin/CollectionList";

export default function Collection({ collections }) {
  return (
    <div>
      <Head>
        <title>Admin - Collections</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <CollectionList collections={collections} />
    </div>
  );
}

export async function getStaticProps() {
  const collections = await getCollectionsList();

  return {
    props: { collections },
  };
}
