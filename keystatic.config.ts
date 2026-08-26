import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'pay3-money/pay3-money',
  },
  collections: {
    caseStudies: collection({
      label: 'Case Studies',
      slugField: 'slug',
      path: 'src/content/case-studies/*',
      format: { data: 'json' },
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { length: { min: 1 } },
        }),
        slug: fields.text({
          label: 'URL Slug',
          description: 'Used in the URL: /case-studies/{slug} (lowercase, hyphens instead of spaces)',
          validation: { length: { min: 1 } },
        }),
        geography: fields.text({ label: 'Geography', validation: { length: { min: 1 } } }),
        industry: fields.text({ label: 'Industry', validation: { length: { min: 1 } } }),
        highlight: fields.text({
          label: 'Highlight',
          description: 'Short summary shown on the card and in social previews',
          validation: { length: { min: 1 } },
        }),
        thumbnail: fields.image({
          label: 'Thumbnail Image',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
          validation: { isRequired: true },
        }),
        customerProfile: fields.text({
          label: 'Customer Profile',
          description: 'Who is the customer? (optional)',
          multiline: true,
        }),
        challenge: fields.text({
          label: 'Business Challenge',
          description: 'What problem were they trying to solve?',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        solution: fields.text({
          label: 'Pay3 Solutions',
          description: 'How did Pay3 solve it? (optional)',
          multiline: true,
        }),
        solutionImage: fields.image({
          label: 'Solution Image',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
        }),
        businessImpact: fields.text({
          label: 'Business Impact',
          description: 'HTML allowed (e.g. <ul><li>...</li></ul>)',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        implementationHighlights: fields.text({
          label: 'Implementation Highlights',
          description: 'Optional text about implementation details',
          multiline: true,
        }),
        implementationImage: fields.image({
          label: 'Implementation Image',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
        }),
        meta: fields.object({
          title: fields.text({
            label: 'SEO Title',
            description: 'Browser tab title (e.g. "Pay3 - Enabling Stablecoin Payments...")',
          }),
          description: fields.text({
            label: 'SEO Description',
            description: 'Shown in search results and social previews',
          }),
        }, {
          label: 'SEO / Social Meta',
          description: 'Controls how this page appears in search engines and social media',
        }),
      },
    }),
  },
});
