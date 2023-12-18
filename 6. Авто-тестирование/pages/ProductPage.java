package pages;

import com.codeborne.selenide.SelenideElement;
import pages.abstractions.RelativePage;

import static com.codeborne.selenide.Selenide.$x;

public class ProductPage extends RelativePage {
    private final SelenideElement addToCardButton = $x("//button[@class='add-to-cart__button item-add-to-cart-clickable']");

    public ProductPage(MainPage mainPage) {
        super(mainPage);
    }

    public ProductPage pressCartButton() {
        addToCardButton.click();
        return this;
    }
}
