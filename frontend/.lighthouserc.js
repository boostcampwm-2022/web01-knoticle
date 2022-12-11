module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['warn', { minScore: 1, aggregationMethod: 'pessimistic' }],
        'categories:best-practices': ['warn', { minScore: 1, aggregationMethod: 'pessimistic' }],
        'categories:seo': ['warn', { minScore: 1, aggregationMethod: 'pessimistic' }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
