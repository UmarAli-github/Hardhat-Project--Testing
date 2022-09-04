const {expect} = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Token contract", function (){

    async function deployTokenFixture(){

        const [owner, alice, bob] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        return {
            owner,
            alice,
            bob,
            hardhatToken
        }

    }


    describe("Deployment", function() {
        
        it("Should set deployer as owner", async function() {

            const { owner, hardhatToken } = await loadFixture(deployTokenFixture);

            expect(await hardhatToken.owner()).to.equal(owner.address);
        })
        
        
        
        it("Deployment should assign the total supply of tokens to the owner", async function() {
        

            const { owner, hardhatToken } = await loadFixture(deployTokenFixture);
    
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
    
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    });


    describe("Transactions", function() {
        
        it("Should transfer tokens from one account to another", async function(){

            const { owner, alice, bob, hardhatToken } = await loadFixture(deployTokenFixture);
    
            //Transfer 10 tokens from owner to alice
    
            await hardhatToken.transfer(alice.address,10);
            expect(await hardhatToken.balanceOf(alice.address)).to.equal(10);
    
            //Transfer 5 tokens from alice to bob
    
            await hardhatToken.connect(alice).transfer(bob.address, 5);
            expect(await hardhatToken.balanceOf(bob.address)).to.equal(5);
    
        })

        it("Should fail if sender does not have enough balance", async function() {

            const { owner, alice, hardhatToken } = await loadFixture(deployTokenFixture);

            const initalBalanceOfTheOwner = await hardhatToken.balanceOf(owner.address);

            await expect(hardhatToken.connect(alice).transfer(owner.address, 10))
            .to.be.revertedWith('Not enough balance!');

            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initalBalanceOfTheOwner);
        })

        it("should update the balances after transactions", async function() {

            const { owner, alice, bob, hardhatToken } = await loadFixture(deployTokenFixture);
        
            const initalBalanceOfTheOwner = await hardhatToken.balanceOf(owner.address);

            await hardhatToken.transfer(alice.address, 5);
            await hardhatToken.transfer(bob.address, 10);

            const finalBalanceOfTheOwner = await hardhatToken.balanceOf(owner.address);

            expect(finalBalanceOfTheOwner).to.equal(initalBalanceOfTheOwner - 15);


            const balanceOfAlice = await hardhatToken.balanceOf(alice.address);

            expect(balanceOfAlice).to.equal(5);


            const balanceOfBob = await hardhatToken.balanceOf(bob.address);

            expect(balanceOfBob).to.equal(10);
        
        })  

    });

} );