import { test, expect } from '@playwright/test';

test.describe('GH Advocacia Landing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the page and show the correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/GH Advocacia/);
    });

    test('should have working navigation anchor links', async ({ page }) => {
        const navLinks = [
            { name: 'Início', href: '#home' },
            { name: 'Sobre', href: '#about' }, // This might fail if the id doesn't exist
            { name: 'Áreas de Atuação', href: '#services' },
            { name: 'Depoimentos', href: '#testimonials' },
        ];

        for (const link of navLinks) {
            const locator = page.locator(`nav a:has-text("${link.name}")`);
            await expect(locator).toBeVisible();
            // Note: We don't click and verify scroll position here to keep it simple, 
            // but we ensure the links exist and point to the right place.
            await expect(locator).toHaveAttribute('href', link.href);
        }
    });

    test('should display contact information and map link', async ({ page }) => {
        const contactSection = page.locator('#contact');
        await expect(contactSection).toBeVisible();

        // Verify contact info details - check if the container with the phone icon is visible
        const phoneItem = page.locator('.info-item:has-text("Telefone")');
        await expect(phoneItem).toBeVisible();

        const emailItem = page.locator('.info-item:has-text("E-mail")');
        await expect(emailItem).toBeVisible();

        // Verify map link
        const mapLink = page.locator('.map-link');
        await expect(mapLink).toBeVisible();
        await expect(mapLink).toHaveAttribute('href', /maps.app.goo.gl/);
    });

    test('should have a WhatsApp CTA button in the header', async ({ page }) => {
        const whatsappBtn = page.locator('.header-actions a.btn-primary');
        await expect(whatsappBtn).toBeVisible();
        await expect(whatsappBtn).toContainText('Consulta Grátis');
        await expect(whatsappBtn).toHaveAttribute('href', /wa.me/);
    });

    test('should show mobile menu button on small screens', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        const mobileMenuBtn = page.locator('.mobile-menu-btn');
        await expect(mobileMenuBtn).toBeVisible();
    });
});
