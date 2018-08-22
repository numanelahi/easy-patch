const easy_patch = require('./patch'),
    should = require('should');

let document, patch1, patch2, patch3;


describe('Document', () => {

    before(() => {
        document = {
            name: "Numan",
            age: 25,
            address: {
                city: "Srinagar",
                state: "J and K",
                phone: "0123456789"
            },
            tags: [{name:'node'}, {name:'npm'}]
        },
        patch1 = {
            occupation: "Business",
            address: {
                city: "Bangalore",
                state: "Karnataka"
            },
            tags: [{name: 'mocha', type: 'testing'},{name:'npm', type: 'package manager'}, {name: 'yarn', type: 'package manager'}]
        },
        patch2 = {
            tags: [easy_patch.ADD, 'deep learning'] //patch.tags.unshift(easy_patch.ADD)
        };

        patch3 = {
            tags: {0: {name: 'jasmine'}}
        }
    });

    describe("#patch1", () => {
        before(() => {
            document = easy_patch(document, patch1);
        });

        it("should add 'occupation' to document", () => {
            document.should.have.property('occupation');
        });

        it("should change 'address.state' to 'Karnataka'", () => {
            document.address.should.have.property('state').which.be.equal('Karnataka');
        });

        it("should change 'address.city' to 'Bangalore'", () => {
            document.address.should.have.property('city').which.be.equal('Bangalore');
        });

        it(`should change property 'name' of first element of 'tags' to 'mocha'`, () => {
            document.tags[0].should.have.property('name').which.be.equal('mocha');
        });

        it(`should add property 'type' to first element of 'tags', with value equal to 'testing'`, () => {
            document.tags[0].should.have.property('type').which.be.equal('testing');
        });

        it(`should add third element to 'tags' with properties 'name' and 'type' equal to 'yarn' and 'package manager'`, () => {
            document.tags[2].should.have.property('name').which.be.equal('yarn')
            document.tags[2].should.have.property('type').which.be.equal('package manager')
        });
    });

    describe("#patch2", () => {
        before(() => {
            document = easy_patch(document, patch2);
        });

        it (`should add 'deep learning' to 'tags' as fourth element`, () => {
            document.tags[3].should.be.equal('deep learning');
        });
    });

    describe("#patch3", () => {
        before(() => {
            document = easy_patch(document, patch3);
        });

        it (`should change property 'name' of first element of 'tags' to 'mocha'`, () => {
            document.tags[0].name.should.be.equal('jasmine');
        });
    });


});