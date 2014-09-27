/* global describe, it */
'use strict';

var assert = require('assert');

describe('#content', function () {
  var content = (new (require('../../src/annotation'))()).list.content;

  it('should return object', function () {
    assert.deepEqual(content.parse('Test'),  {
      description : 'Test',
      autogenerated : false,
    });
    assert.deepEqual(content.parse('\nTest\t'),  {
      description : '\nTest\t',
      autogenerated : false,
    });
    assert.deepEqual(content.parse('\nTest\n\nTest\t'),  {
      description : '\nTest\n\nTest\t',
      autogenerated : false,
    });
  });

  it('should add @content to all items that contain it in item.context.code', function(){
    var fixture = {
      'mixin' : {
        'testMixin' : {
          context : {
            code : '@content'
          }
          // content : {} should be added
        },
        'testMixinUserAdded' : {
          context : {
            code : '@content'
          },
          content : [{ // Should not be overwritten
            description : 'User generated',
            autogenerated : false
          }]
        }
      }
    };

    var expected = {
      'mixin' : {
        'testMixin' : {
          context : {
            code : '@content'
          },
          content : [{
            autogenerated : true
          }]
        },
        'testMixinUserAdded' : {
          context : {
            code : '@content'
          },
          content : [{
            description : 'User generated',
            autogenerated : false
          }]
        }
      }
    };
    content.resolve(fixture);
    assert.deepEqual(fixture, expected);
  });
});
