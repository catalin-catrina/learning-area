import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const PROJECT_ID = 'hwgw03gi';
const DATASET = 'production';
const SANITY_TOKEN =
  'skpGXVhin1IcEEdifYLr5wfJMGix1JvIDBLD2ocbrssLSF1yubzvXfkaEYlvyhjLvMhw25VxsyXEidsdYdKxtJxuiSitzuIcqswohmAgR7Wt95aAat9yDIclNxCSg3e2BmPQ0soiy430jwS0MGq8JkPrfkouKXMTxkDlGe1S99fgqaVQZosc';

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-02-06',
  useCdn: false,
  token: SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = source => {
  return builder.image(source);
};
