/* global jest, jasmine, describe, it, expect, beforeEach, Event */

import React from 'react';
import Component from '../BulkDeleteMessage';
import ShallowRenderer from 'react-test-renderer/shallow';

const noFoldersProps = {
  folderDescendantFileTotals: { totalItems: 0, totalCount: 0 },
};

const oneFolderProps = {
  folderDescendantFileTotals: { totalItems: 1, totalCount: 5 },
};

const manyfolderProps = {
  folderDescendantFileTotals: { totalItems: 2, totalCount: 10 },
};

const noFilesProps = {
  fileTotalItems: 0,
};

const oneFileProps = {
  fileTotalItems: 1,
};

const manyFilesProps = {
  fileTotalItems: 2,
};

const getMessage = (count) => [
  `Warning: You're about to delete ${count} file(s) which may be used in your site's content.`,
  'Please carefully check the file usage to ensure they are removed from the content areas',
  'prior to deleting them, otherwise they will appear as broken links.'
].join(' ');

describe('BulkDeleteMessage', () => {
  const renderer = new ShallowRenderer();

  describe('Deleting a file and a folder', () => {
    const testCases = [
      [
        'file in use',
        { ...noFoldersProps, ...oneFileProps },
        getMessage('1'),
      ],
      [
        'folder in use',
        { ...noFilesProps, ...oneFolderProps },
        getMessage('5'),
      ],
      [
        'file and folder in use',
        { ...oneFileProps, ...oneFolderProps },
        getMessage('6'),
      ],
    ];

    testCases.forEach(([desc, props, expectedMessage]) => {
      it(desc, () => {
        renderer.render(<Component {...props} />);
        const result = renderer.getRenderOutput();
        expect(result.props.children).toEqual(
          <p>{expectedMessage}</p>
        );
      });
    });
  });

  describe('Deleting folders', () => {
    const testCases = [
      [
        'one folder in use',
        { ...noFilesProps, ...oneFolderProps },
        getMessage('5'),
      ],
      [
        'multiple folders in use',
        { ...noFilesProps, ...manyfolderProps },
        getMessage('10'),
      ],
    ];

    testCases.forEach(([desc, props, expectedMessage]) => {
      it(desc, () => {
        renderer.render(<Component {...props} />);
        const result = renderer.getRenderOutput();
        expect(result.props.children).toEqual(
          <p>{expectedMessage}</p>
        );
      });
    });
  });

  describe('Deleting files', () => {
    const testCases = [
      [
        'one file in use',
        { ...noFoldersProps, ...oneFileProps },
        getMessage('1'),
      ],
      [
        'many files in use',
        { ...noFoldersProps, ...manyFilesProps },
        getMessage('2'),
      ]
    ];

    testCases.forEach(([desc, props, expectedMessage]) => {
      it(desc, () => {
        renderer.render(<Component {...props} />);
        const result = renderer.getRenderOutput();
        expect(result.props.children).toEqual(
          <p>{expectedMessage}</p>
        );
      });
    });
  });
});
